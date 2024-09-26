const express = require('express');
require('dotenv').config();
const cors = require('cors');
// const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
const { createGraphQLApolloServer } = require("./graphql/main");
const { typeDefs } = require('./graphql/typedefs/db1');
const { resolvers } = require('./graphql/resolvers/db1');

const app = express();

app.use(cors());
app.use(express.json());

const server = createGraphQLApolloServer(typeDefs, resolvers);
// startStandaloneServer(server, { listen: { port: 4000 } }).then(data => {
//     console.log('GraphQL Server Started Successfully.')
// }).catch(error => {
//     console.log(error.message);
// })
(async () => {
    await server.start()
    app.use('/graphql', expressMiddleware(server));
})();

const port = process.env.PORT || 80;
app.listen(port, error => {
    if (error) console.log(error.message);
    else console.log('Server started successfully at Port: ', port);
})