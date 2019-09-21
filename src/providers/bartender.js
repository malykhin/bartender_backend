const EventEmitter = require('events')

const { timeoutPromise } = require('../utils/common')
const commands = require('../constants/commands')
const statuses = require('../constants/statuses')
const initSerial = require('../providers/serial')
const config = require('../config')

const { port, parser } = initSerial(config.serialPort, +config.baudRate)

class Bartender {
  constructor(options) {
    const { port, parser, timeout } = options

    this.parser = parser
    this.port = port
    this.parser.on('data', (data) => {
      const response = JSON.parse(data)
      if (response.status === statuses.READY) {
        this.isReady = true
      }
    })

    this.timeout = timeout
    this._isReady = false

    this.readyStatusChangeEmitter = new EventEmitter()
  }

  get isReady() {
    return this._isReady
  }

  set isReady(isReady) {
    this._isReady = isReady
    this.readyStatusChangeEmitter.emit('is_ready_change', isReady)
  }

  async sendCommand(command) {
    try {
      if (!this.isReady) {
        return { status: statuses.NOT_READY }
      }
      this.isReady = false
      console.log('command', command)
      await this.port.write(`${JSON.stringify(command)}\n`)

      const waitForAnswer = new Promise((resolve) => {
        this.parser.once('data', (data) => resolve(JSON.parse(data)))
      })

      return Promise.race([timeoutPromise(this.timeout), waitForAnswer])
    } finally {
      this.isReady = true
    }
  }

  getSettings() {
    return this.sendCommand({ command: commands.GET_SETTINGS })
  }

  setSettings(zeroSpeed, zeroAccel, maxStroke, speed, accel, dozerOn, dozerOff, dozerIdle, dozerCycleDelay) {
    return this.sendCommand({
      command: commands.SET_SETTINGS,
      zeroSpeed,
      zeroAccel,
      maxStroke,
      speed,
      accel,
      dozerOn,
      dozerOff,
      dozerIdle,
      dozerCycleDelay,
    })
  }

  reset() {
    return this.sendCommand({ command: commands.RESET })
  }

  moveTo(position) {
    return this.sendCommand({ command: commands.MOVE_TO, position })
  }

  pushDozer() {
    return this.sendCommand({ command: commands.PUSH_DOZER })
  }

  idleDozer() {
    return this.sendCommand({ command: commands.IDLE_DOZER })
  }

  prepareDozer() {
    return this.sendCommand({ command: commands.PREPARE_DOZER })
  }

  getStatus() {
    return this.sendCommand({ command: commands.GET_STATUS })
  }
}

module.exports = new Bartender({ port, parser, timeout: 5000 })
