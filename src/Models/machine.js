const Joi = require('joi')
const Common = require('./Common')

const schema = Joi.object().keys({
  maximumStroke: Joi.number().integer(),
  stepsPerMm: Joi.number().integer(),
})

class Machine extends Common {
  constructor(schema) {
    super(schema)
  }
}

module.exports = new Machine(schema)
