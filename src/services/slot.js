const slotDao = require('../DAO/slot')
const slotModel = require('../Models/slot')

function getAll() {
  return slotDao.getAll()
}

function getById(id) {
  return slotDao.getById(id)
}

function create(data) {
  const slot = slotModel.create(data)
  return slotDao.create(slot)
}

function patchById(id, slot) {
  const slotToPatch = { ...slotDao.getById(id), ...slot }
  slotModel.validate(slotToPatch)
  return slotDao.patchById(id, slotToPatch)
}

function deleteById(id) {
  return slotDao.delete(id)
}

function assignLiquid(slotId, liquidId) {
  const slotToAttachLiquid = { ...slotDao.getById(slotId), ...liquidId }
  slotModel.validate(slotToAttachLiquid)
  return slotDao.patchById(slotId, slotToAttachLiquid)
}

module.exports = {
  getAll,
  getById,
  create,
  patchById,
  deleteById,
  assignLiquid,
}
