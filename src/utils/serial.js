const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

function init(portName, baudRate) {
  const port = new SerialPort(portName, { baudRate })
  const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
  return { parser, port }
}

module.exports = init
