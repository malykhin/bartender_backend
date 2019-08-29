const { gql } = require('apollo-server')

module.exports = gql`
  type Mutation {
    createLiquid(name: String!, description: String!): Liquid
    deleteLiquid(id: ID!): Liquid
    editLiquid(id: ID!, name: String!, description: String!): Liquid
  }
`
