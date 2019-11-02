const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const logger = require('../utils/logger')

function init(portName, baudRate) {
  const port = new SerialPort(portName, { baudRate })
  const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
  parser.on('data', (data) => logger('Data received:', data))
  return { parser, port }
}

module.exports = init
