const { gql } = require('apollo-server')

module.exports = gql`
  type Slot {
    id: ID
    name: String
    coordinate: Int
    liquidId: String
    shotVolume: Int
    description: String
  }
`
