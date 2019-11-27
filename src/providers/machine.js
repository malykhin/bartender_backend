const bartender = require('../providers/bartender')

class Machine {
  constructor(bartender) {
    this.bartender = bartender
  }

  async run(ingredients, homePosition, finishPosition) {
    await this.bartender.prepareDozer()
    await this.bartender.reset()
    for (let ingredient of ingredients) {
      await this.bartender.moveTo(ingredient.coordinate)
      const pushIterator = Array(ingredient.pushesNumber)
        .fill(false)
        .map((item, index, array) => index === array.length - 1)

      for (let isLastPush of pushIterator) {
        await this.bartender.pushDozer(isLastPush)
      }
    }

    await this.bartender.moveTo(finishPosition)
    await this.bartender.idleDozer()
  }

  async reset() {
    await this.bartender.prepareDozer()
    await this.bartender.reset()
    await this.bartender.idleDozer()
  }
}

module.exports = new Machine(bartender)
