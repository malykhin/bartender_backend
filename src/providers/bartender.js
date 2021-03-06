const EventEmitter = require('events')

const { timeoutPromise, wait } = require('../utils/common')
const commands = require('../constants/commands')
const initSerial = require('../providers/serial')
const config = require('../config')
const { NotReady } = require('../constants/errors')
const { GLASS_STATUS_CHANGED } = require('../constants/subscriptionStatuses')

const logger = require('../utils/logger')
const pubSub = require('../providers/apolloPubSub')

const { port, parser } = initSerial(config.serialPort, +config.baudRate)

class Bartender {
  constructor(options) {
    const { port, parser, timeout, pubSub } = options

    this.parser = parser
    this.port = port
    this.timeout = timeout
    this._isReady = true
    this.pubSub = pubSub
    this.readyStatusChangeEmitter = new EventEmitter()

    parser.on('data', (data) => {
      const { type, isGlassInserted } = JSON.parse(data)
      if (type === GLASS_STATUS_CHANGED) {
        pubSub.publish(GLASS_STATUS_CHANGED, { glassStatus: { isGlassInserted: isGlassInserted } })
      }
    })
  }

  get isReady() {
    return this._isReady
  }

  set isReady(isReady) {
    this._isReady = isReady
    this.readyStatusChangeEmitter.emit('is_ready_change', isReady)
  }

  async sendCommand(command) {
    await wait(100)
    logger('Command:', command)
    try {
      if (!this.isReady) {
        throw NotReady
      }
      this.isReady = false
      const waitForAnswer = new Promise((resolve) => {
        this.parser.once('data', (data) => {
          logger('Command answer:', data)
          resolve(JSON.parse(data))
        })
      })
      await this.port.write(`${JSON.stringify(command)}\n`)
      const result = await Promise.race([timeoutPromise(this.timeout), waitForAnswer])
      logger('Command result:', result)
      this.isReady = true
      return result
    } catch (error) {
      logger('Send command error:', error)
      this.isReady = true
      throw error
    }
  }

  getSettings() {
    return this.sendCommand({ command: commands.GET_SETTINGS })
  }

  setSettings({ zeroSpeed, zeroAccel, maxStroke, speed, accel, dozerOn, dozerOff, dozerIdle, dozerCycleDelay }) {
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

  pushDozer(isLastPush) {
    return this.sendCommand({ command: commands.PUSH_DOZER, isLastPush })
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

module.exports = new Bartender({ port, parser, pubSub, timeout: 15000 })
