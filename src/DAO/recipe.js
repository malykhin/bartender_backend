const Common = require('./Common')
const db = require('../utils/db')

class Recipe extends Common {
  constructor(db, name, defaultStructure) {
    super(db, name, defaultStructure)
  }
}

module.exports = new Recipe(db, 'recipe', [])
