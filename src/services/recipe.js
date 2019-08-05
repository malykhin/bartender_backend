const _ = require('lodash')

const Common = require('./Common')

const recipeDao = require('../DAO/recipe')
const recipeModel = require('../Models/recipe')

const liquidDao = require('../DAO/liquid')
const liquidModel = require('../Models/liquid')

const slotDao = require('../DAO/slot')
const slotModel = require('../Models/slot')

const recipeIngredientDao = require('../DAO/recipeIngredient')
const recipeIngredientModel = require('../Models/recipeIngredient')

const { relateOneToMany, relateOneToOne } = require('../utils/dataHelpers')
const errors = require('../constants/errors')

class Recipe extends Common {
  constructor(
    model,
    dao,
    _recipeIngredientModel,
    _recipeIngredientDao,
    _liquidModel,
    _liquidDao,
    _slotModel,
    _slotDao,
  ) {
    super(model, dao)
    this.recipeIngredientDao = _recipeIngredientDao
    this.recipeIngredientModel = _recipeIngredientModel
    this.liquidDao = _liquidDao
    this.liquidModel = _liquidModel
    this.slotModel = _slotModel
    this.slotDao = _slotDao
  }

  getById(id) {
    const withRecipeIngredients = relateOneToMany(
      this.dao.getById(id),
      this.recipeIngredientDao.getAll(),
      'receiptId',
      'ingredients',
    )
    const liquids = this.liquidDao.getAll()
    const slots = this.slotDao.getAll()

    return {
      ...withRecipeIngredients,
      ingredients: withRecipeIngredients.ingredients.map((ingredient) => {
        const withIngredientsLiquid = relateOneToOne(ingredient, liquids, 'liquidId', 'liquid')
        const slot = slots.find((slot) => slot.liquidId === _.get(withIngredientsLiquid, 'liquid.liquidId'))

        return {
          ...withIngredientsLiquid,
          liquid: {
            ...withIngredientsLiquid.liquid,
            ..._.mapKeys(slot, (key) => `slot${_.upperFirst(key)}`),
          },
        }
      }),
    }
  }

  getAllWithExistingIngredients() {
    const availableLiquidIds = this.slotDao
      .getAll()
      .filter((item) => item)
      .map((item) => item.liquidId)

    const grouped = _.groupBy(recipeIngredientDao.getAll(), 'receiptId')

    return this.dao
      .getAll()
      .filter((recipe) =>
        grouped[recipe.id].every((recipeIngredient) => availableLiquidIds.includes(recipeIngredient.liquidId)),
      )
  }

  addIngredient(receiptId, liquidId, volume) {
    if (_.isEmpty(this.dao.getById(receiptId))) {
      throw errors.EntityIsNotExist
    }
    if (_.isEmpty(this.liquidDao.getById(liquidId))) {
      throw errors.EntityIsNotExist
    }
    return this.recipeIngredientDao.create({ receiptId, liquidId, volume })
  }

  updateIngredient(ingredientId, liquidId, volume) {
    if (_.isEmpty(this.recipeIngredientDao.getById(ingredientId))) {
      throw errors.EntityIsNotExist
    }
    if (_.isEmpty(this.liquidDao.getById(liquidId))) {
      throw errors.EntityIsNotExist
    }
    return this.recipeIngredientDao.patchById(ingredientId, { liquidId, volume })
  }

  deleteIngredient(ingredientId) {
    return this.recipeIngredientDao.deleteById(ingredientId)
  }
}

module.exports = new Recipe(
  recipeModel,
  recipeDao,
  recipeIngredientModel,
  recipeIngredientDao,
  liquidModel,
  liquidDao,
  slotModel,
  slotDao,
)
