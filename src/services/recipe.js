// const liquidDao = require('../DAO/liquid')
// const recipeIngredientDao = require('../DAO/recipeIngredient')
const recipeDao = require('../DAO/recipe')
// const slotDao = require('../DAO/slot')
// const recipeIngredientModel = require('../Models/recipeIngredient')
// const liquidModel = require('../Models/liquid')
const recipeModel = require('../Models/recipe')
// const slotModel = require('../Models/slot')

function getAll() {
  return recipeDao.getAll()
}

function getAllWithExistingIngredients() {
  return recipeDao.getAll() // TODO: get with related liquids, filter by liquids, attached to slots
}

function getById(id) {
  return recipeDao.getById(id) // TODO: get with all nested relations
}

function create(data) {
  const recipe = recipeModel.create(data)
  return recipeDao.create(recipe)
}

function patchById(id, recipe) {
  const recipeToPatch = { ...recipeDao.getById(id), ...recipe }
  recipeModel.validate(recipeToPatch)
  return recipeDao.patchById(id, recipeToPatch)
}

function deleteById(id) {
  return recipeDao.delete(id)
}

function addIngredient() {}

function updateIngredient() {}

function deleteIngredient() {}

module.exports = {
  getAll,
  getAllWithExistingIngredients,
  getById,
  create,
  patchById,
  deleteById,
  addIngredient,
  updateIngredient,
  deleteIngredient,
}
