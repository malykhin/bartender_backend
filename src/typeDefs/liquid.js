const { gql } = require('apollo-server')

module.exports = gql`
  type Liquid {
    id: ID
    name: String
    description: String
  }
`
