const _ = require('lodash')

const Common = require('./Common')

const slotDao = require('../DAO/slot')
const slotModel = require('../Models/slot')

const liquidDao = require('../DAO/liquid')
const liquidModel = require('../Models/liquid')

const { relateOneToOne } = require('../utils/dataHelpers')
const errors = require('../constants/errors')

class Slot extends Common {
  constructor(model, dao, _liquidModel, _liquidDao) {
    super(model, dao)
    this.liquidDao = _liquidDao
    this.liquidModel = _liquidModel
  }

  getAll() {
    return relateOneToOne(this.dao.getAll(), this.liquidDao.getAll(), 'liquidId', 'slot')
  }

  getById(id) {
    return relateOneToOne(this.dao.getById(id), this.liquidDao.getAll(), 'liquidId', 'slot')
  }

  assignLiquid(slotId, liquidId) {
    if (_.isEmpty(this.dao.getById(slotId))) {
      throw errors.EntityIsNotExist
    }
    if (_.isEmpty(this.liquidDao.getById(liquidId))) {
      throw errors.EntityIsNotExist
    }
    const slotToAttachLiquid = { ...this.dao.getById(slotId), liquidId }
    this.model.validate(slotToAttachLiquid)
    return this.dao.patchById(slotId, slotToAttachLiquid)
  }
}

module.exports = new Slot(slotModel, slotDao, liquidModel, liquidDao)
