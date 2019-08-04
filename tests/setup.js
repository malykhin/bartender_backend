const fs = require('fs')
const path = require('path')

module.exports = () => {
  fs.unlinkSync(path.join(__dirname, '../test.db.json'))
  require('../src/DAO/applyDefault')
}
