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
    const entityToPatch = { ...this.dao.get(), ...entity }
    this.model.validate(entityToPatch)
    return this.dao.update(entityToPatch)
  }

  updateField(key, value) {
    const newMachineState = { ...this.dao.get(), [key]: value }
    return this.update(newMachineState)
  }
}

module.exports = new Machine(machineModel, machineDao)
