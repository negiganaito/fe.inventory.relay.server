import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLList } from 'graphql';
import { JSDependencyField } from './render-on-fetch/js-dependency.js';
import { fromGlobalId, globalIdField, nodeDefinitions } from 'graphql-relay';

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

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId: string) => {
    const { type, id } = fromGlobalId(globalId);
    switch (type) {
      case 'Category':
        return getCategory(id);
      case 'Brands':
        return getBrand(id);
    }
  },
  (obj): any => {
    switch (obj.__typename) {
      case 'User':
        return UserType;
      case 'Category':
        return CategoryType;
      case 'Brand':
        return BrandType;
      default:
        return null;
    }
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
    categories: {
      type: new GraphQLList(CategoryType),
    },
    js: JSDependencyField,
  },
});

export const CreateSuppliesDialogType = new GraphQLObjectType({
  name: 'CreateSuppliesDialog',
  fields: {
    categoryList_renderer: {
      type: CategoryListRendererType,
    },
  },
});
// ============================================================================
