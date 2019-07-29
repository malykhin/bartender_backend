const SerialPort = require('serialport')

const Bartender = require('./providers/Bartender')
const initSerial = require('./utils/serial')

async function run() {
  const portsList = await SerialPort.list()

  console.log(portsList)

  const { port, parser } = initSerial('/dev/tty.usbserial-A9OFBDHD', 57600)

  const bartender = new Bartender({ port, parser, timeout: 5000 })

  bartender.readyStatusChangeEmitter.once('is_ready_change', () => bartender.reset().then(console.log))
}

run()
