const recipe = require('../../src/services/recipe')
const liquid = require('../../src/services/liquid')

const { recipe0, recipe1, recipe2, recipe3, recipe4, recipe5, recipe6 } = require('../mocks/recipe')
const { grenadine, water, aperol } = require('../mocks/liquids')

describe('recipe service', () => {
  it('Should be initialized', () => {
    expect(recipe.getAll()).toStrictEqual([])
  })

  it('Should create', () => {
    expect(recipe.create(recipe0)).toBeInstanceOf(Object)
  })

  it('Should patchById', () => {
    const { id: recipeId } = recipe.create(recipe1)
    recipe.patchById(recipeId, { description: 'recipe1' })
    const { description } = recipe.getById(recipeId)
    expect(description).toBe('recipe1')
  })

  it('Should deleteById', () => {
    const { id: recipeId } = recipe.create(recipe2)
    const length = recipe.getAll().length
    recipe.deleteById(recipeId)
    expect(recipe.getAll().length).toBe(length - 1)
  })

  it('Should getById', () => {
    const { id: recipeId } = recipe.create(recipe3)
    expect(recipe.getById(recipeId)).toBeInstanceOf(Object)
  })

  it('Should getAllWithExistingIngredients', () => {
    expect(recipe.getAllWithExistingIngredients()).toBeInstanceOf(Array)
  })

  it('Should addIngredient', () => {
    const { id: liquidId } = liquid.create(grenadine)
    const { id: recipeId } = recipe.create(recipe4)

    expect(recipe.addIngredient(recipeId, liquidId, 50)).toBeInstanceOf(Object)
  })

  it('Should updateIngredient', () => {
    const { id: recipeId } = recipe.create(recipe5)
    const { id: liquidId } = liquid.create(water)
    const { id: ingredientId } = recipe.addIngredient(recipeId, liquidId, 50)
    expect(recipe.updateIngredient(ingredientId, liquidId, 25)).toBeInstanceOf(Object)
  })

  it('Should deleteIngredient', () => {
    const { id: recipeId } = recipe.create(recipe6)
    const { id: liquidId } = liquid.create(aperol)
    const { id: ingredientId } = recipe.addIngredient(recipeId, liquidId, 50)
    recipe.deleteIngredient(ingredientId)
    expect(recipe.getById(recipeId)).toBeInstanceOf(Object)
  })
})
