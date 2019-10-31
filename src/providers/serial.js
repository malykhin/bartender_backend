const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

function init(portName, baudRate) {
  const port = new SerialPort(portName, { baudRate })
  const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
  parser.on('data', (data) => console.log('Data received:', data))
  return { parser, port }
}

module.exports = init
