class Common {
  constructor(model, dao) {
    this.model = model
    this.dao = dao
  }

  getAll() {
    return this.dao.getAll()
  }

  getById(id) {
    return this.dao.getById(id)
  }

  create(data) {
    const entity = this.model.create(data)
    return this.dao.create(entity)
  }

  patchById(id, entity) {
    const entityToPatch = { ...this.dao.getById(id), ...entity }
    this.model.validate(entityToPatch)
    return this.dao.patchById(id, entityToPatch)
  }

  deleteById(id) {
    return this.dao.delete(id)
  }
}

module.exports = Common
