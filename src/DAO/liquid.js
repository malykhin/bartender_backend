const Common = require('./Common')
const db = require('../utils/db')

class Liquid extends Common {
  constructor(db, name) {
    super(db, name)
  }
}

module.exports = new Liquid(db, 'liquid')
