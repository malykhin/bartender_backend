const Common = require('./Common')
const db = require('../utils/db')

class Liquid extends Common {
  constructor(db, name, defaultStructure) {
    super(db, name, defaultStructure)
  }
}

module.exports = new Liquid(db, 'liquid', [])
