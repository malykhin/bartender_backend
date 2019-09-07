module.exports = {
  Query: {
    slots: (_, __, { dataSources: { slot } }) => slot.getAll(),
    slot: (_, { id }, { dataSources: { slot } }) => slot.getById(id),
    liquids: (_, __, { dataSources: { liquid } }) => liquid.getAll(),
    liquid: (_, { id }, { dataSources: { liquid } }) => liquid.getById(id),
    machine: (_, __, { dataSources: { machine } }) => machine.get(),
    recipes: (_, __, { dataSources: { recipe } }) => recipe.getAll(),
  },
}
