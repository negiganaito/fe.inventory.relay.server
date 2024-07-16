import { GraphQLObjectType } from 'graphql';
import { createSuppliesCategorySuppliesDialog } from './create-supplies-category-dialog.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    supplies_create_category: createSuppliesCategorySuppliesDialog,
  },
});
