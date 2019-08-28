const { gql } = require('apollo-server')

module.exports = gql`
  type Mutation {
    createLiquid(name: String!, description: String!): Liquid
    deleteLiquid(id: ID!): Liquid
  }
`
