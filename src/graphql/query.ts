import { GraphQLObjectType, GraphQLList } from 'graphql';
import { CategoryType, UserType, BrandType } from './schema.js';
import { FakeData } from './fake-data.js';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
    },
    categories: {
      type: new GraphQLList(CategoryType),
    },
    brands: {
      type: new GraphQLList(BrandType),
    },
  },
});

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
  user: () => ({
    userProfile_renderer: {
      name: 'Lê Xuân Tiến',
      age: 27,
    },
  }),
  categories: () => FakeData.categoriesMockList,
  brands: () => FakeData.brandsMockList,
};

export { QueryType, rootValue };
