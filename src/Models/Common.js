const uuid = require('uuid/v4')

class Common {
  constructor(schema) {
    this.schema = schema
  }

  validate(item) {
    const validationResult = this.schema.validate(item)
    if (validationResult.error) {
      throw validationResult.error
    }
  }

  create(item) {
    this.validate(item)
    return {
      ...item,
      id: uuid(),
    }
  }
}

module.exports = Common
