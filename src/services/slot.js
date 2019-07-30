const Common = require('./Common')

const slotDao = require('../DAO/slot')
const slotModel = require('../Models/slot')

// const liquidDao = require('../DAO/liquid')
// const liquidModel = require('../Models/liquid')

class Slot extends Common {
  constructor(model, dao) {
    super(model, dao)
  }

  getAll() {
    return this.dao.getAll() //TODO: get with related liquids
  }

  getById(id) {
    return this.dao.getById(id) //TODO: get with related liquid
  }

  assignLiquid(slotId, liquidId) {
    const slotToAttachLiquid = { ...this.dao.getById(slotId), ...liquidId }
    this.model.validate(slotToAttachLiquid)
    return this.dao.patchById(slotId, slotToAttachLiquid)
  }
}

module.exports = new Slot(slotModel, slotDao)
