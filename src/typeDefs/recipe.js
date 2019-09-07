const { gql } = require('apollo-server')

module.exports = gql`
  type Recipe {
    id: ID
    name: String
    description: String
  }
`
