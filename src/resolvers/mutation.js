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
    editSlot: (_, { id, name, description, coordinate, liquidId, shotVolume }, { dataSources: { slot } }) => {
      return slot.patchById(id, { name, description, coordinate, liquidId, shotVolume })
    },
    editAxis: (_, { zeroSpeed, zeroAccel, maxStroke, speed, accel, stepsPerMm }, { dataSources: { machine } }) => {
      return machine.update({ zeroSpeed, zeroAccel, maxStroke, speed, accel, stepsPerMm })
    },
    editDozer: (_, { dozerOn, dozerOff, dozerIdle, dozerCycleDelay }, { dataSources: { machine } }) => {
      return machine.update({ dozerOn, dozerOff, dozerIdle, dozerCycleDelay })
    },
    editFinalPosition: (_, { finalPosition }, { dataSources: { machine } }) => {
      return machine.update({ finalPosition })
    },
    editHomePosition: (_, { homePosition }, { dataSources: { machine } }) => {
      return machine.update({ homePosition })
    },
    createRecipe: (_, { name, description }, { dataSources: { recipe } }) => {
      return recipe.create({ name, description })
    },
    deleteRecipe: (_, { id }, { dataSources: { recipe } }) => {
      return recipe.deleteById(id)
    },
    editRecipe: (_, { id, name, description }, { dataSources: { recipe } }) => {
      return recipe.patchById(id, { name, description })
    },
  },
}
