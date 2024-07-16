import express, { json } from 'express';
import queryMap from './s-2-c/queryMap.json' assert { type: 'json' };
import { GraphQLSchema, graphql } from 'graphql';
import { QueryType, rootValue } from './graphql/query.js';
import { Mutation } from './graphql/mutation/index.js';
import { dataDrivenDependencies } from './graphql/render-on-fetch/js-dependency.js';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: Mutation,
});

const app = express();

app.use(json());

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
