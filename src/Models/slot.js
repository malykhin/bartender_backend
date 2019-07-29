const Joi = require('joi')
const Common = require('./Common')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  name: Joi.string()
    .min(1)
    .max(255)
    .required(),
  coordinate: Joi.number()
    .integer()
    .required(),
  liquidId: Joi.string().uuid(),
  shotVolume: Joi.number()
    .integer()
    .required(),
  description: Joi.string()
    .min(1)
    .max(255),
})

class Slot extends Common {
  constructor(schema) {
    super(schema)
  }
}

module.exports = new Slot(schema)
