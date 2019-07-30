const Common = require('./Common')

const recipeDao = require('../DAO/recipe')
const recipeModel = require('../Models/recipe')

// const liquidDao = require('../DAO/liquid')
// const liquidModel = require('../Models/liquid')

// const slotDao = require('../DAO/slot')
// const slotModel = require('../Models/slot')

// const recipeIngredientDao = require('../DAO/recipeIngredient')
// const recipeIngredientModel = require('../Models/recipeIngredient')

class Recipe extends Common {
  constructor(model, dao) {
    super(model, dao)
  }

  getById(id) {
    return this.dao.getById(id) // TODO: get with all nested relations
  }

  getAllWithExistingIngredients() {
    return this.dao.getAll() // TODO: get with related liquids, filter by liquids, attached to slots
  }

  addIngredient() {}

  updateIngredient() {}

  deleteIngredient() {}
}

module.exports = new Recipe(recipeModel, recipeDao)
