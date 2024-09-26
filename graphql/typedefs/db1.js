const typeDefs = `#graphql
enum Role{
    admin
    user
}

type User{
    _id:ID!
    name: String!
    apikeys: [String]
    role: Role!
    email: String!
}

type Writer {
    _id: ID!
    name: String!
    bio: String
    nationality: String
    birthdate: String
    deathdate: String
    genres: [String]
    books: [Book]
    debut_year: Int
    wid: String!
}

type Book {
    _id: ID!
    title: String!
    genre: String
    publication_year: Int
    pages: Int
    summary: String
    writers: [Writer]
    ISBN: String!
    language: String
    publisher: String
    bid: String!
}

type CnUResponse{
    message: String!
}

type Query{
    users(apikey: String!): [User],
    writers(apikey: String!): [Writer],
    books(apikey: String!): [Book],
    userByID(apikey: String!, _id: ID!): User,
    writerByID(apikey: String!, _id: ID!): Writer,
    bookByID(apikey: String!, _id: ID!): Book,
}

type Mutation{
    cuser(apikey: String!, name: String!, apikeys: [String], role: String!, email: String!): CnUResponse
    cwriter(apikey: String!, name: String!, bio: String, nationality: String, birthdate: String, deathdate: String, genres: [String], books: [String], debut_year: Int, wid: String!): CnUResponse
    cbook(apikey: String!, title: String!, genre: String, publication_year: Int, pages: Int, summary: String, writers: [String], ISBN: String!, language: String, publisher: String, bid: String!): CnUResponse
    uuserByID(apikey: String!, _id: String!, name: String, apikeysToAdd: [String], apikeysToRemove: [String], role: String, email: String): CnUResponse
    uwriterByID(apikey: String!, _id: String!, name: String, bio: String, nationality: String, birthdate: String, deathdate: String, genresToAdd: [String], genresToRemove: [String], booksToAdd: [String], booksToRemove: [String], debut_year: Int, wid: String): CnUResponse
    ubookByID(apikey: String!, _id: String!, title: String, genre: String, publication_year: Int, pages: Int, summary: String, writersToAdd: [String], writersToRemove: [String], ISBN: String, language: String, publisher: String, bid: String): CnUResponse
}
`;

module.exports = { typeDefs };