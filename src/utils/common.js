const { TimeoutExceeded } = require('../constants/errors')

const timeoutPromise = (delay) =>
  new Promise((reject) => {
    setTimeout(() => reject(TimeoutExceeded), delay)
  })

module.exports = { timeoutPromise }
