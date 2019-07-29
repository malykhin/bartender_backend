const Common = require('./Common')
const db = require('../utils/db')

class RecipeIngredient extends Common {
  constructor(db, name, defaultStructure) {
    super(db, name, defaultStructure)
  }
}

module.exports = new RecipeIngredient(db, 'recipe_ingredient', [])
