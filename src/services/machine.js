const machineDao = require('../DAO/machine')
const machineModel = require('../Models/machine')

class Machine {
  constructor(model, dao) {
    this.model = model
    this.dao = dao
  }

  get() {
    return this.dao.get()
  }

  update(entity) {
    this.model.validate(entity)
    return this.dao.update(entity)
  }

  updateField(key, value) {
    const newMachineState = { ...this.dao.get(), [key]: value }
    return this.update(newMachineState)
  }
}

module.exports = new Machine(machineModel, machineDao)
