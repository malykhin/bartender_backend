const { gql } = require('apollo-server')

module.exports = gql`
  type RecipeIngredient {
    id: ID
    recipeId: ID
    liquidId: ID
    volume: Int
  }
`
