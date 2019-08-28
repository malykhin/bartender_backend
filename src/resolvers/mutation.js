module.exports = {
  Mutation: {
    createLiquid: (_, { name, description }, { dataSources: { liquid } }) => {
      return liquid.create({ name, description })
    },
    deleteLiquid: (_, { id }, { dataSources: { liquid } }) => {
      return liquid.deleteById(id)
    },
  },
}
