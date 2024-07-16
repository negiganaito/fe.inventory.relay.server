import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { CategoryType } from '../schema.js';
import { FakeData } from '../fake-data.js';

const suppliesCreateBrandPayload = {
  name: { type: new GraphQLNonNull(GraphQLString) },
};

const createSuppliesBrandSuppliesDialog = mutationWithClientMutationId({
  name: 'SuppliesCreateBrand',
  inputFields: suppliesCreateBrandPayload,
  outputFields: {
    brands: {
      type: new GraphQLList(CategoryType),
      resolve: (payload) => payload,
    },
  },

  mutateAndGetPayload: ({ name }) => {
    const newBrand = {
      id: String(FakeData.brandsMockList.length + 1),
      name,
    };
    FakeData.brandsMockList.push(newBrand);
    return FakeData.brandsMockList;
  },
});

export { createSuppliesBrandSuppliesDialog };
