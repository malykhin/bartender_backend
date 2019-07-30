require('./DAO/applyDefault')

const Bartender = require('./providers/Bartender')
const initSerial = require('./utils/serial')

const config = require('./config')

async function run() {
  const { port, parser } = initSerial(config.serialPort, config.baudRate)

  const bartender = new Bartender({ port, parser, timeout: 5000 })

  bartender.readyStatusChangeEmitter.once('is_ready_change', () => bartender.reset().then(console.log))
}

run()
