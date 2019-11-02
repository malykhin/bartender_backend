const { ApolloServer } = require('apollo-server')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const slot = require('./services/slot')
const recipe = require('./services/recipe')
const machine = require('./services/machine')
const liquid = require('./services/liquid')
const logger = require('./utils/logger')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    liquid,
    machine,
    recipe,
    slot,
  }),
})

module.exports = () =>
  server.listen().then(({ url }) => {
    logger('Server ready at:', url)
  })
