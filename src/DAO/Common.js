class Common {
  constructor(db, name, defaultStructure) {
    this.db = db
    this.name = name
    this.defaultStructure = defaultStructure
  }

  getById(id) {
    return this.db
      .get(this.name)
      .find({ id })
      .value()
  }

  create(entity) {
    return this.db
      .get(this.name)
      .push(entity)
      .find({ id: entity.id })
      .write()
  }

  getAll() {
    return this.db.get(this.name).value()
  }

  deleteById(id) {
    return this.db
      .get(this.name)
      .remove({ id })
      .write()
  }

  patchById(id, entity) {
    return this.db
      .get(this.name)
      .find({ id })
      .assign({ ...entity, id })
      .write()
  }
}

module.exports = Common
