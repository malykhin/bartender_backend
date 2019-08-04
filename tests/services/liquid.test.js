const liquid = require('../../src/services/liquid')

const rum = {
  name: 'rum',
  description: 'rum',
}

const cola = {
  name: 'cola',
  description: 'cola',
}

const whiskey = {
  name: 'whiskey',
  description: 'whiskey',
}

const vodka = {
  name: 'vodka',
  description: 'v',
}

describe('liquid service', () => {
  it('Should be initialized', () => {
    expect(liquid.getAll()).toStrictEqual([])
  })

  it('Should create liquids', () => {
    expect(liquid.create(rum)).toBeInstanceOf(Object)
    expect(liquid.create(cola)).toBeInstanceOf(Object)
  })

  it('Should get by id liquid', () => {
    const { id } = liquid.create(whiskey)
    expect(liquid.getById(id)).toBeInstanceOf(Object)
  })

  it('Should return 3 created liquids', () => {
    const items = liquid.getAll()
    expect(items).toBeInstanceOf(Array)
    expect(items.length).toBe(3)
  })

  it('Should edit created liquid', () => {
    const { id } = liquid.create(vodka)
    const { description } = liquid.patchById(id, { description: 'vodka' })
    expect(description).toBe('vodka')
  })

  it('Should delete created liquid', () => {
    const { id } = liquid.create({ name: 'a', description: 'b' })
    const collectionSize = liquid.getAll().length
    liquid.deleteById(id)
    expect(liquid.getAll().length).toBe(collectionSize - 1)
  })
})
