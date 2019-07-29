const path = require('path')
const fs = require('fs')

const db = require('../utils/db')

const filenameFilter = (filename) =>
  filename !== 'Common.js' &&
  filename !== 'applyDefault.js' &&
  filename.indexOf('.js') > 0 &&
  filename.indexOf('.') !== 0

const dbDefaults = fs
  .readdirSync(path.resolve(__dirname))
  .filter(filenameFilter)
  .map((filename) => require(path.resolve(__dirname, filename)))
  .filter((item) => item.name && item.defaultStructure)
  .reduce((acc, item) => {
    acc[item.name] = item.defaultStructure
    return acc
  }, {})

db.defaults(dbDefaults).write()
