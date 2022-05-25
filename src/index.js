require('dotenv').config();
const { ApolloServer } = require('apollo-server')
const { ApolloServer: ApolloServerExpress } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const express = require('express');
const { createServer } = require('http');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const cors = require('cors')

const typeDefs = require('./mergeTypeDefs.js');
const resolvers = require('./mergeResolvers.js');

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  app.use(cors({origin: '*'}));

  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServerExpress({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    introspection: true,
    playground: true,
    context: ({ req }) => {
      return { req };
    }
  });
  await server.start();
  const path = '/gql'
  server.applyMiddleware({ app, path })
  const port = process.env.PORT;
  await new Promise(resolve => httpServer.listen(port, resolve))
  console.log(`🚀 [Gateway] Server ready at http://localhost:${port}${server.graphqlPath}`)

  const devServer = new ApolloServer({
    schema,
    context: async () => {
      return { req: { session: {} } }
    },
    introspection: true,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })
  devServer.listen(parseInt(port) + 1, '0.0.0.0').then(({ url }) => {
    console.log(`🚀 [Gateway - Backend Dev Only, not used on apps] GraphQL DEV API ready at ${url}`);
  })
}

startApolloServer(typeDefs, resolvers).then();
