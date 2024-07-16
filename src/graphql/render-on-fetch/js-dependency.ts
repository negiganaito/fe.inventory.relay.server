import { GraphQLScalarType, GraphQLNonNull, GraphQLString } from 'graphql';

const JSDependencyType = new GraphQLScalarType({
  name: 'JSDependency',
  serialize: (value) => value,
});

export const JSDependencyField = {
  args: {
    module: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLString },
  },
  type: new GraphQLNonNull(JSDependencyType),

  resolve: async (_, { module }) => {
    seenDataDrivenDependencies.add(module);
    return module;
  },
};

const seenDataDrivenDependencies = new Set();

export const dataDrivenDependencies = {
  reset() {
    seenDataDrivenDependencies.clear();
  },
  getModules() {
    return Array.from(seenDataDrivenDependencies);
  },
};
