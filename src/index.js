require('dotenv').config()
require('./DAO/applyDefault')

const startServer = require('./server')

async function run() {
  await startServer()
}

run()
