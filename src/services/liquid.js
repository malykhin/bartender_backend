const liquidDao = require('../DAO/liquid')
const liquidModel = require('../Models/liquid')

function getAll() {
  return liquidDao.getAll()
}

function getById(id) {
  return liquidDao.getById(id)
}

function create(data) {
  const liquid = liquidModel.create(data)
  return liquidDao.create(liquid)
}

function patchById(id, liquid) {
  const liquidToPatch = { ...liquidDao.getById(id), ...liquid }
  liquidModel.validate(liquidToPatch)
  return liquidDao.patchById(id, liquidToPatch)
}

function deleteById(id) {
  return liquidDao.delete(id)
}

module.exports = {
  getAll,
  getById,
  create,
  patchById,
  deleteById,
}
