const Joi = require('joi')
const Common = require('./Common')

const schema = Joi.object().keys({
  id: Joi.string().uuid(),
  recipeId: Joi.string().uuid(),
  liquidId: Joi.string()
    .uuid()
    .allow(null),
  volume: Joi.number()
    .integer()
    .allow(null),
})

class RecipeIngredient extends Common {
  constructor(schema) {
    super(schema)
  }
}

module.exports = new RecipeIngredient(schema)
