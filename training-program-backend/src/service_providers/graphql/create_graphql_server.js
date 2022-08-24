import { ApolloServer } from 'apollo-server-express'
import sequelizePerRequestTransactionPlugin from '~/src/utils/apollo_plugin_sequelize_transaction'

import typeDefs from './schema'
import resolvers from './resolvers'
import debugConfig from './apollo/debug_config'

function createGraphQLServer (app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    ...debugConfig,
    debug: process.env.NODE_ENV !== 'production',
    plugins: [sequelizePerRequestTransactionPlugin]
  })

  server.applyMiddleware({ app, cors: false })

  return server
}

export default createGraphQLServer
