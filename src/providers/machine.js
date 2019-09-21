async function run(bartender, ingredients, homePosition, finishPosition) {
  await bartender.prepareDozer()
  await bartender.moveTo(homePosition)

  for (let ingredient of ingredients) {
    await bartender.moveTo(ingredient.coordinate)
    const pushIterator = Array(ingredient.pushesNumber).fill(true)

    for (let i of pushIterator) {
      bartender.pushDozer(i)
    }
  }

  await bartender.moveTo(finishPosition)
  await bartender.idleDozer()
}

module.exports = {
  run,
}
