const Common = require('./Common')
const db = require('../utils/db')

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

const defaultStructure = {
  zeroSpeed: 0,
  zeroAccel: 0,
  maxStroke: 0,
  speed: 0,
  accel: 0,
  stepsPerMm: 0,

  dozerOn: 0,
  dozerOff: 0,
  dozerIdle: 0,
  dozerCycleDelay: 0,

  finalPosition: 0,

  homePosition: 0,
}

module.exports = new Machine(db, 'machine', defaultStructure)
