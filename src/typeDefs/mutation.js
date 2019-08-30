const { gql } = require('apollo-server')

module.exports = gql`
  type Mutation {
    createLiquid(name: String!, description: String!): Liquid
    deleteLiquid(id: ID!): Liquid
    editLiquid(id: ID!, name: String!, description: String!): Liquid
    createSlot(name: String!, description: String!, coordinate: Int!, liquidId: ID!, shotVolume: Int!): Slot
    deleteSlot(id: ID!): Slot
  }
`
