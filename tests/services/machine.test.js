const machine = require('../../src/services/machine')

const { machine1 } = require('../mocks/machine')

describe('machine service', () => {
  it('Should be initialized', () => {
    expect(machine.get()).toStrictEqual({})
  })

  it('Should update', () => {
    machine.update(machine1)
    expect(machine.get()).toStrictEqual(machine1)
  })

  it('Should update field', () => {
    machine.updateField('maximumStroke', 200)
    expect(machine.get()).toStrictEqual({ ...machine1, maximumStroke: 200 })
  })
})
