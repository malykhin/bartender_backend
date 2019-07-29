const Common = require('./Common')
const db = require('../utils/db')

class Slot extends Common {
  constructor(db, name) {
    super(db, name)
  }
}

module.exports = new Slot(db, 'slot')
