import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import { JSDependencyField } from './render-on-fetch/js-dependency.js';
import { fromGlobalId, globalIdField, nodeDefinitions } from 'graphql-relay';
import { FakeData } from './fake-data.js';

// ====================================================

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCategory = (_id) => {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getBrand = (_id) => {};

const getCategoryListRenderer = (id: any) => {
  return {
    id,
    __typename: 'CategoryListRenderer',
    categories: () =>
      FakeData.categoriesMockList.map((category) => ({
        ...category,

        __typename: 'Category',
      })),
  };
};

const getBrandListRenderer = (id: any) => {
  return {
    id,
    __typename: 'BrandListRenderer',
    brands: () =>
      FakeData.brandsMockList.map((category) => ({
        ...category,

        __typename: 'Brand',
      })),
  };
};

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId: string) => {
    const { type, id } = fromGlobalId(globalId);
    console.log({ type, id });

    switch (type) {
      case 'Category':
        return getCategory(id);
      case 'Brands':
        return getBrand(id);
      case 'CategoryListRenderer':
        return getCategoryListRenderer(id);

      case 'BrandListRenderer':
        return getBrandListRenderer(id);
    }
  },
  (obj): any => {
    if (obj.__typename) {
      return obj.__typename;
    }
    return null;
  },
);

export const UserProfileRendererType = new GraphQLObjectType({
  name: 'UserProfileRenderer',
  fields: {
    age: { type: GraphQLInt },
    name: { type: new GraphQLNonNull(GraphQLString) },
    js: JSDependencyField,
  },
});

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    userProfile_renderer: {
      type: UserProfileRendererType,
    },
  },
});

export const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: {
    id: globalIdField('Category'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    parentId: {
      type: GraphQLString,
    },
  },
  interfaces: [nodeInterface],
});

export const BrandType = new GraphQLObjectType({
  name: 'Brand',
  fields: {
    id: globalIdField('Brand'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  interfaces: [nodeInterface],
});

// ============================================================================
export const CategoryListRendererType = new GraphQLObjectType({
  name: 'CategoryListRenderer',
  fields: {
    id: globalIdField('CategoryListRenderer'),
    categories: {
      type: new GraphQLList(CategoryType),
    },
    js: JSDependencyField,
  },
  interfaces: [nodeInterface],
});

export const BrandListRendererType = new GraphQLObjectType({
  name: 'BrandListRenderer',
  fields: {
    id: globalIdField('BrandListRenderer'),
    brands: {
      type: new GraphQLList(BrandType),
    },
    js: JSDependencyField,
  },
  interfaces: [nodeInterface],
});

export const CreateSuppliesDialogType = new GraphQLObjectType({
  name: 'CreateSuppliesDialog',
  fields: {
    categoryList_renderer: {
      type: CategoryListRendererType,
    },

    brandList_renderer: {
      type: BrandListRendererType,
    },
  },
});

// ============================================================================
