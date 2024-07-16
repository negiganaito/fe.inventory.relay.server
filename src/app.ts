import express, { json } from 'express';
// import queryMap from '@gatsly/s-2-c/queryMap.json' assert { type: 'json' };
import { GraphQLSchema, graphql } from 'graphql';
import { QueryType, rootValue } from './graphql/query.js';
import { Mutation } from './graphql/mutation/index.js';
import { dataDrivenDependencies } from './graphql/render-on-fetch/js-dependency.js';

import url from 'url';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: Mutation,
});

const app = express();

app.use(json());

let queryMap;

const fetchQueryMap = async () => {
  try {
    const response = await fetch(
      process.env.NODE_ENV === 'development'
        ? url.pathToFileURL('../../s-2-c/queryMap.json')
        : 'https://raw.githubusercontent.com/negiganaito/s-2-c/main/queryMap.json',
    );
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    queryMap = await response.json();
  } catch (error) {
    console.error('Failed to fetch query map:', error);
  }
};

fetchQueryMap(); // Fetch queryMap initially

const handleCors = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  next();
};

app.use(handleCors);

const graphqlHandler = async (req, res) => {
  const requestParams = req.body;

  let response: any = { data: null };
  if (
    req.method === 'POST'
    // && requestParams
  ) {
    dataDrivenDependencies.reset();
    response = await graphql({
      schema,
      rootValue,
      source:
        requestParams !== null &&
        requestParams !== undefined &&
        requestParams.id !== null &&
        requestParams.id !== undefined
          ? queryMap[requestParams.id]
          : requestParams.query,
      variableValues: requestParams.variables,
    });
  }

  if (response.errors) {
    console.error('GraphQL Server Errors', response.errors);
  }

  response.extensions = {
    modules: dataDrivenDependencies.getModules(),
  };

  res.status(200).json(response);
};

app.post('/api/graphql', graphqlHandler);

const port = 5000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/graphql`);
});
