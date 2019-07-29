const Joi = require('joi')
const Common = require('./Common')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  name: Joi.string()
    .min(1)
    .max(255)
    .required(),
  description: Joi.string()
    .min(1)
    .max(255),
})

class Recipe extends Common {
  constructor(schema) {
    super(schema)
  }
}

module.exports = new Recipe(schema)
