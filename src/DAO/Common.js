class Common {
  constructor(db, name) {
    this.db = db
    this.name = name
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
