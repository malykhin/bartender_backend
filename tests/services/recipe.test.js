const recipe = require('../../src/services/recipe')

const { recipe0, recipe1, recipe2 } = require('../mocks/recipe')

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

  it('Should getById', () => {})

  it('Should getAllWithExistingIngredients', () => {})

  it('Should updateIngredient', () => {})

  it('Should deleteIngredient', () => {})
})
