const { TimeoutExceeded } = require('../constants/errors')

const timeoutPromise = (delay) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(TimeoutExceeded), delay)
  })

const fileNamesImportFilter = (fileName) => fileName !== 'index.js' && fileName.indexOf('.js') > 0

module.exports = { timeoutPromise, fileNamesImportFilter }
