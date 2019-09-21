require('dotenv').config()
require('./DAO/applyDefault')

const startServer = require('./server')

async function run() {
  await startServer()
}

run()

//bartender.readyStatusChangeEmitter.once('is_ready_change', () => bartender.reset().then(console.log))
