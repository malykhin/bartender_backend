const Common = require('./Common')
const db = require('../utils/db')

class RecipeIngredient extends Common {
  constructor(db, name) {
    super(db, name)
  }
}

module.exports = new RecipeIngredient(db, 'recipe_ingredient')
