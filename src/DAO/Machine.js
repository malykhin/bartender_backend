const Common = require('./Common')
const db = require('../utils/db')
const { defaultMachine } = require('../constants/defaults')

class Machine extends Common {
  constructor(db, name, defaultStructure) {
    super(db, name, defaultStructure)
  }

  get() {
    return this.db.get(this.name).value()
  }

  update(entity) {
    return this.db
      .set(this.name, entity)
      .get(this.name)
      .write()
  }
}

module.exports = new Machine(db, 'machine', defaultMachine)
