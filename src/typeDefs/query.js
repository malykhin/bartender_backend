const { gql } = require('apollo-server')

module.exports = gql`
  type Query {
    slots: [Slot]
    slot(id: ID!): Slot
    liquids: [Liquid]
    liquid(id: ID!): Liquid
    machine: Machine
    recipes: [Recipe]
  }
`
