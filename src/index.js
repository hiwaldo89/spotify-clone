require("dotenv").config();
const mongoose = require("mongoose");
require("./Database/Models");

const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphQL/schema");
const resolvers = require("./graphQL/resolvers");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log("connected to db");
    },
    err => console.log(err)
  )
  .catch(e => console.log(e));

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
