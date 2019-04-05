const express = require("express");
const logger = require("morgan");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const models = require("./models");

const app = express();
const port = 4000;

const server = new ApolloServer({ typeDefs, resolvers, context: { models } });
server.applyMiddleware({ app });
models.sequelize.authenticate();

models.sequelize.sync();

app.use(logger("dev"));

app.listen(
  { port },
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
