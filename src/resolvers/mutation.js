const { omit } = require('lodash')
const pubSub = require('../providers/apolloPubSub')
const machineProvider = require('../providers/machine')
const bartender = require('../providers/bartender')
const { STATUS_CHANGED } = require('../constants/subscriptionStatuses')
const { BUSY, READY } = require('../constants/machineStatuses')

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

    editAxis: async (
      _,
      { zeroSpeed, zeroAccel, maxStroke, speed, accel, stepsPerMm },
      { dataSources: { machine } },
    ) => {
      const existingSettings = await bartender.getSettings()

      const settings = {
        ...omit(existingSettings, ['status']),
        zeroSpeed: zeroSpeed * stepsPerMm,
        zeroAccel: zeroAccel * stepsPerMm,
        maxStroke: maxStroke * stepsPerMm,
        speed: speed * stepsPerMm,
        accel: accel * stepsPerMm,
      }
      await bartender.setSettings(settings)
      return machine.update({ zeroSpeed, zeroAccel, maxStroke, speed, accel, stepsPerMm })
    },

    editDozer: async (_, { dozerOn, dozerOff, dozerIdle, dozerCycleDelay }, { dataSources: { machine } }) => {
      const existingSettings = await bartender.getSettings()

      await bartender.setSettings({
        ...omit(existingSettings, ['status']),
        dozerOn,
        dozerOff,
        dozerIdle,
        dozerCycleDelay,
      })
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

    createIngredient: (_, { recipeId }, { dataSources: { recipe } }) => {
      return recipe.addIngredient(recipeId, null, null)
    },

    deleteIngredient: (_, { ingredientId }, { dataSources: { recipe } }) => {
      return recipe.deleteIngredient(ingredientId)
    },

    editIngredient: (_, { id, liquidId, volume }, { dataSources: { recipe } }) => {
      return recipe.updateIngredient(id, liquidId, volume)
    },

    processRecipe: async (_, { recipeId }, { dataSources: { recipe, slot, machine } }) => {
      pubSub.publish(STATUS_CHANGED, { machineStatus: { statusName: BUSY } })

      const recipeDescription = recipe.getById(recipeId)
      const slots = slot.getAll()
      const { homePosition, finalPosition, stepsPerMm } = machine.get()

      try {
        const ingredients = recipeDescription.ingredients
          .map(({ liquidId, volume }) => {
            const { shotVolume, coordinate } = slots.find((slot) => slot.liquidId === liquidId)
            const pushesNumber = Math.ceil(volume / shotVolume) || 1
            return { pushesNumber, coordinate: coordinate * stepsPerMm }
          })
          .sort((a, b) => a.coordinate - b.coordinate)

        await machineProvider.run(ingredients, homePosition * stepsPerMm, finalPosition * stepsPerMm)
        pubSub.publish(STATUS_CHANGED, { machineStatus: { statusName: READY } })
      } catch (error) {
        pubSub.publish(STATUS_CHANGED, { machineStatus: { statusName: READY } })
        throw error
      }

      return recipeDescription
    },

    resetMachine: async () => {
      pubSub.publish(STATUS_CHANGED, { machineStatus: { statusName: BUSY } })
      await machineProvider
        .reset()
        .catch((error) => {
          throw error
        })
        .finally(() => {
          pubSub.publish(STATUS_CHANGED, { machineStatus: { statusName: READY } })
        })
      return true
    },
  },
}
