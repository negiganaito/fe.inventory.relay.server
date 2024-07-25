import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import { JSDependencyField } from './render-on-fetch/js-dependency.js';
import { fromGlobalId, globalIdField, nodeDefinitions } from 'graphql-relay';
import { FakeData } from './fake-data.js';

// ====================================================

// ========================= for user

// const {nodeInterface, nodeField} = nodeDefinitions(
//   (string globalId ) => {
//     const {type, id}: {id: string, type: string} = fromGlobalId(globalId);

//     if (type === 'Todo') {
//       return (getTodoOrThrow(id));
//     } else if (type === 'User') {
//       return (getUserOrThrow(id));
//     }
//     return null;
//   },
//   (GraphQLObjectType obj = {}) => {
//     if (obj instanceof Todo) {
//       return GraphQLTodo;
//     } else if (obj instanceof User) {
//       return GraphQLUser;
//     }
//     return null;
//   },
// );

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
    categories: () =>
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
    categories: {
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
