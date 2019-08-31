const { gql } = require('apollo-server')

module.exports = gql`
  type Machine {
    zeroSpeed: Int
    zeroAccel: Int
    maxStroke: Int
    speed: Int
    accel: Int
    stepsPerMm: Int

    dozerOn: Int
    dozerOff: Int
    dozerIdle: Int
    dozerCycleDelay: Int

    finalPosition: Int

    homePosition: Int
  }
`
