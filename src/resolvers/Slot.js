module.exports = {
  Query: {
    slots: (_, __, { dataSources: { slot } }) => slot.getAll(),
    slot: (_, { id }, { dataSources: { slot } }) => slot.getById(id),
  },
}
