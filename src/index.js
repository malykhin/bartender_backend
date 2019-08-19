require('./DAO/applyDefault')

// const config = require('./config')

// const Bartender = require('./providers/Bartender')
// const initSerial = require('./utils/serial')
const startServer = require('./server')

async function run() {
  await startServer()
  //const { port, parser } = initSerial(config.serialPort, config.baudRate)

  //const bartender = new Bartender({ port, parser, timeout: 5000 })

  //bartender.readyStatusChangeEmitter.once('is_ready_change', () => bartender.reset().then(console.log))
}

run()
