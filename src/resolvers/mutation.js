module.exports = {
  Mutation: {
    createLiquid: (_, { name, description }, { dataSources: { liquid } }) => {
      return liquid.create({ name, description })
    },
    deleteLiquid: (_, { id }, { dataSources: { liquid } }) => {
      return liquid.deleteById(id)
    },
    editLiquid: (_, { id, name, description }, { dataSources: { liquid } }) => {
      return liquid.patchById(id, { name, description })
    },
    createSlot: (_, { name, description, coordinate, liquidId, shotVolume }, { dataSources: { slot } }) => {
      return slot.create({ name, description, coordinate, liquidId, shotVolume })
    },
    deleteSlot: (_, { id }, { dataSources: { slot } }) => {
      return slot.deleteById(id)
    },
  },
}
