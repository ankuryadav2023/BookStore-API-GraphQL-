const { ApolloServer } = require('@apollo/server');

const createGraphQLApolloServer = (typeDefs, resolvers) => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    return server;
}

module.exports = { createGraphQLApolloServer };