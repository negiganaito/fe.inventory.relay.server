import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { CategoryType } from '../schema.js';
import { categoriesMockList } from '../data.js';

const suppliesCreateCategoryPayload = {
  name: { type: new GraphQLNonNull(GraphQLString) },
};

const createSuppliesCategorySuppliesDialog = mutationWithClientMutationId({
  name: 'SuppliesCreateCategory',
  inputFields: suppliesCreateCategoryPayload,
  outputFields: {
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: (payload) => payload,
    },
  },

  mutateAndGetPayload: ({ name }) => {
    const newCategory = {
      id: String(categoriesMockList.length + 1),
      name,
      parentId: null,
    };
    categoriesMockList.push(newCategory);
    return categoriesMockList;
  },
});

export { createSuppliesCategorySuppliesDialog };
