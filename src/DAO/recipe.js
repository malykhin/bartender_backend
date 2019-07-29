const Common = require('./Common')
const db = require('../utils/db')

class Recipe extends Common {
  constructor(db, name) {
    super(db, name)
  }
}

module.exports = new Recipe(db, 'recipe')
