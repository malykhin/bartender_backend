const { gql } = require('apollo-server')

module.exports = gql`
  type Mutation {
    createLiquid(name: String!, description: String!): Liquid
    deleteLiquid(id: ID!): Liquid
    editLiquid(id: ID!, name: String!, description: String!): Liquid

    createSlot(name: String!, description: String!, coordinate: Int!, liquidId: ID!, shotVolume: Int!): Slot
    deleteSlot(id: ID!): Slot
    editSlot(id: ID!, name: String!, description: String!, coordinate: Int!, liquidId: ID!, shotVolume: Int!): Slot

    editAxis(zeroSpeed: Int!, zeroAccel: Int!, maxStroke: Int!, speed: Int!, accel: Int!, stepsPerMm: Int!): Machine
    editDozer(dozerOn: Int!, dozerOff: Int!, dozerIdle: Int!, dozerCycleDelay: Int!): Machine
    editFinalPosition(finalPosition: Int!): Machine
    editHomePosition(homePosition: Int!): Machine

    createRecipe(name: String!, description: String!): Recipe
    deleteRecipe(id: ID!): Recipe
  }
`
