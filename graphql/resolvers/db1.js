const { users, writers, books } = require('../../models/db1');

const authorizer = async (apikey) => {
    try {
        const response = await users.findOne({ apikeys: apikey });
        if (response) return { isUser: true, role: response.role };
        else return { isUser: false };
    } catch (error) {
        console.log(error.message);
        return { isUser: false };
    }
}

const getBookWriters = async (parent) => {
    try {
        const response = await writers.find();
        return response.filter(writer => {
            return parent.writers.includes(writer.wid);
        })
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const getWriterBooks = async (parent) => {
    try {
        const response = await books.find();
        return response.filter(book => {
            return parent.books.includes(book.bid);
        })
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

const getAllUsers = async (_, { apikey }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            const response = await users.find();
            return response;
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getAllWriters = async (_, { apikey }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser) {
            const response = await writers.find();
            return response;
        } else {
            throw new Error('User is not registered with us.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getAllBooks = async (_, { apikey }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser) {
            const response = await books.find();
            return response;
        } else {
            throw new Error('User is not registered with us.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getUserByID = async (_, { apikey, _id }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            const response = await users.findById(_id);
            return response;
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getWriterByID = async (_, { apikey, _id }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser) {
            const response = await writers.findById(_id);
            return response;
        } else {
            throw new Error('User is not registered with us.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const getBookByID = async (_, { apikey, _id }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser) {
            const response = await books.findById(_id);
            return response;
        } else {
            throw new Error('User is not registered with us.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const createUser = async (_, { apikey, name, apikeys, role, email }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            await users.create({ name, apikeys, role, email });
            return { message: 'User created successfully.' }
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const createWriter = async (_, { apikey, name, bio, nationality, birthdate, deathdate, genres, books, debut_year, wid }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            await writers.create({ name, bio, nationality, birthdate, deathdate, genres, books, debut_year, wid });
            return { message: 'Writer created successfully.' }
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const createBook = async (_, { apikey, title, genre, publication_year, pages, summary, writers, ISBN, language, publisher, bid }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            await books.create({ title, genre, publication_year, pages, summary, writers, ISBN, language, publisher, bid });
            return { message: 'Book created successfully.' }
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const updateUserByID = async (_, { apikey, _id, name, apikeysToAdd, apikeysToRemove, role, email }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            const response = await users.findById(_id);
            if (name) response.name = name;
            if (apikeysToAdd) response.apikeys = [...response.apikeys, ...apikeysToAdd];
            if (apikeysToRemove) response.apikeys = response.apikeys.filter(apikey => {
                return !apikeysToRemove.includes(apikey);
            });
            if (role) response.role = role;
            if (email) response.email = email;
            await response.save();
            return { message: 'User updated successfully.' }
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const updateWriterByID = async (_, { apikey, _id, name, bio, nationality, birthdate, deathdate, genres, books, debut_year, wid }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            const response = await writers.findById(_id);
            if (name) response.name = name;
            if (bio) response.bio = bio;
            if (nationality) response.nationality = nationality;
            if (birthdate) response.birthdate = birthdate;
            if (deathdate) response.deathdate = deathdate;
            if (genresToAdd) response.genres = [...response.genres, ...genresToAdd];
            if (genresToRemove) response.genres = response.genres.filter(genre => {
                return !genresToRemove.includes(genre);
            });
            if (booksToAdd) response.books = [...response.books, ...booksToAdd];
            if (booksToRemove) response.books = response.books.filter(book => {
                return !booksToRemove.includes(book);
            });
            if (debut_year) response.debut_year = debut_year;
            if (wid) response.wid = wid;
            await response.save();
            return { message: 'Writer updated successfully.' }
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const updateBookByID = async (_, { apikey, _id, title, genre, publication_year, pages, summary, writers, ISBN, language, publisher, bid }) => {
    try {
        const authResponse = await authorizer(apikey);
        if (authResponse.isUser && authResponse.role === 'admin') {
            const response = await books.findById(_id);
            if (title) response.title = title;
            if (genre) response.genre = genre;
            if (publication_year) response.publication_year = publication_year;
            if (pages) response.pages = pages;
            if (summary) response.summary = summary;
            if (writersToAdd) response.writers = [...response.writers, ...writersToAdd];
            if (writersToRemove) response.writers = response.writers.filter(writer => {
                return !writersToRemove.includes(writer);
            });
            if (ISBN) response.ISBN = ISBN;
            if (language) response.language = language;
            if (publisher) response.publisher = publisher;
            if (bid) response.bid = bid;
            await response.save();
            return { message: 'Book updated successfully.' }
        } else {
            throw new Error('User is not registered with us or not an admin.');
        }
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

const resolvers = {
    Query: {
        users: getAllUsers,
        writers: getAllWriters,
        books: getAllBooks,
        userByID: getUserByID,
        writerByID: getWriterByID,
        bookByID: getBookByID
    },
    Mutation: {
        cuser: createUser,
        cwriter: createWriter,
        cbook: createBook,
        uuserByID: updateUserByID,
        uwriterByID: updateWriterByID,
        ubookByID: updateBookByID
    },
    Book: {
        writers: getBookWriters
    },
    Writer: {
        books: getWriterBooks
    }
}

module.exports = { resolvers };