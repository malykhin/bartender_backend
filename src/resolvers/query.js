module.exports = {
  Query: {
    slots: (_, __, { dataSources: { slot } }) => slot.getAll(),
    slot: (_, { id }, { dataSources: { slot } }) => slot.getById(id),
    liquids: (_, __, { dataSources: { liquid } }) => liquid.getAll(),
    liquid: (_, { id }, { dataSources: { liquid } }) => liquid.getById(id),
  },
}