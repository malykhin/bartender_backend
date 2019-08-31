const Joi = require('joi')
const Common = require('./Common')

const schema = Joi.object().keys({
  zeroSpeed: Joi.number().integer(),
  zeroAccel: Joi.number().integer(),
  maxStroke: Joi.number().integer(),
  speed: Joi.number().integer(),
  accel: Joi.number().integer(),
  stepsPerMm: Joi.number().integer(),

  dozerOn: Joi.number().integer(),
  dozerOff: Joi.number().integer(),
  dozerIdle: Joi.number().integer(),
  dozerCycleDelay: Joi.number().integer(),

  finalPosition: Joi.number().integer(),

  homePosition: Joi.number().integer(),
})

class Machine extends Common {
  constructor(schema) {
    super(schema)
  }
}

module.exports = new Machine(schema)

// zeroSpeed,
// zeroAccel,
// maxStroke,
// speed,
// accel,
// stepsPerMm

// dozerOn,
// dozerOff,
// dozerIdle,
// dozerCycleDelay,

// finalPosition

// homePosition
