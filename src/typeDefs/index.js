const fs = require('fs')
const path = require('path')

const { fileNamesImportFilter } = require('../utils/common')

module.exports = fs
  .readdirSync(path.join(__dirname))
  .filter(fileNamesImportFilter)
  .map((fileName) => require(path.join(__dirname, fileName)))
