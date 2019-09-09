const { gql } = require('apollo-server')

module.exports = gql`
  type MachineStatus {
    statusName: String
  }
`
