const slot = require('../../src/services/slot')
const liquid = require('../../src/services/liquid')

const { slot0, slot1, slot2, slot3 } = require('../mocks/slots')

const { tonic } = require('../mocks/liquids')

describe('slot service', () => {
  it('Should be initialized', () => {
    expect(slot.getAll()).toStrictEqual([])
  })

  it('Should create slots', () => {
    expect(slot.create(slot0)).toBeInstanceOf(Object)
    expect(slot.create(slot1)).toBeInstanceOf(Object)
  })

  it('Should get by id slot', () => {
    const { id } = slot.create(slot2)
    expect(slot.getById(id)).toBeInstanceOf(Object)
  })

  it('Should get 3 created slots', () => {
    const items = slot.getAll()
    expect(items).toBeInstanceOf(Array)
    expect(items.length).toBe(3)
  })

  it('Should assign liquid to slot', () => {
    const { id: slotId } = slot.create(slot3)
    const { id: liquidId } = liquid.create(tonic)

    const result = slot.assignLiquid(slotId, liquidId)
    expect(result).toBeInstanceOf(Object)
    expect(slot.getById(slotId).liquid).toBeInstanceOf(Object)
  })
})
