import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLNonNull } from 'graphql';
import { JSDependencyField } from './render-on-fetch/js-dependency.js';

// ====================================================

// ========================= for user

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
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    parentId: {
      type: GraphQLString,
    },
  },
});
