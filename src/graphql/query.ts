import { GraphQLObjectType, GraphQLList } from 'graphql';
import { CategoryType, UserType, BrandType, nodeField, CreateSuppliesDialogType } from './schema.js';
import { FakeData } from './fake-data.js';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    categories: {
      type: new GraphQLList(CategoryType),
    },
    brands: {
      type: new GraphQLList(BrandType),
    },
    // below this is 3D
    user: {
      type: UserType,
    },
    createSuppliesDialog: {
      type: CreateSuppliesDialogType,
    },
  },
});

// The rootValue provides a resolver function for each API endpoint
const rootValue = {
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

  // below this is 3D
  user: () => ({
    userProfile_renderer: {
      name: 'Lê Xuân Tiến',
      age: 27,
    },
  }),

  createSuppliesDialog: () => ({
    categoryList_renderer: {
      id: 'uniqueIdForCategoryListRenderer', // Ensure this id is unique
      __typename: 'CategoryListRenderer',
      categories: () =>
        FakeData.categoriesMockList.map((category) => ({
          ...category,
          __typename: 'Category',
        })),
    },
  }),

  // createSuppliesDialog: () =>
  //   FakeData.categoriesMockList.map((category) => ({
  //     ...category,
  //     __typename: 'Experimental_Category',
  //   })),
};

export { QueryType, rootValue };
