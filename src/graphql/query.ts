import { GraphQLObjectType, GraphQLList } from 'graphql';
import { CategoryType, UserType, BrandType, nodeField } from './schema.js';
import { FakeData } from './fake-data.js';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
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
  categories: () =>
    FakeData.categoriesMockList.map((category) => ({
      ...category,
      __typename: 'Category',
    })),
  brands: () =>
    FakeData.brandsMockList.map((brand) => ({
      ...brand,
      __typename: 'Brand',
    })),
};

export { QueryType, rootValue };
