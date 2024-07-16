import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { CategoryType } from '../schema.js';
import { FakeData } from '../fake-data.js';

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
      id: String(FakeData.categoriesMockList.length + 1),
      name,
      parentId: null,
    };
    FakeData.categoriesMockList.push(newCategory);
    return FakeData.categoriesMockList;
  },
});

export { createSuppliesCategorySuppliesDialog };
