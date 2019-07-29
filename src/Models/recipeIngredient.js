const Joi = require('joi')
const Common = require('./Common')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  receiptId: Joi.string().uuid(),
  liquidId: Joi.string().uuid(),
  volume: Joi.number()
    .integer()
    .required(),
})

class RecipeIngredient extends Common {
  constructor(schema) {
    super(schema)
  }
}

module.exports = new RecipeIngredient(schema)
