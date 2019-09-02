const machine = require('../../src/services/machine')
const { defaultMachine } = require('../../src/constants/defaults')
const { machine1 } = require('../mocks/machine')

describe('machine service', () => {
  it('Should be initialized', () => {
    expect(machine.get()).toStrictEqual(defaultMachine)
  })

  it('Should update', () => {
    machine.update(machine1)
    expect(machine.get()).toStrictEqual(machine1)
  })

  it('Should update field', () => {
    machine.updateField('maxStroke', 200)
    expect(machine.get()).toStrictEqual({ ...machine1, maxStroke: 200 })
  })
})
