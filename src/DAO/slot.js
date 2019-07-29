const Common = require('./Common')
const db = require('../utils/db')

class Slot extends Common {
  constructor(db, name, defaultStructure) {
    super(db, name, defaultStructure)
  }
}

module.exports = new Slot(db, 'slot', [])
