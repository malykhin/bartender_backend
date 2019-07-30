const Common = require('./Common')
const liquidDao = require('../DAO/liquid')
const liquidModel = require('../Models/liquid')

class Liquid extends Common {
  constructor(model, dao) {
    super(model, dao)
  }
}

module.exports = new Liquid(liquidModel, liquidDao)
