const mongoose = require('mongoose');

const connectToMongoDB = (connectionURI, databaseName) => {
    try {
        const db = mongoose.createConnection(connectionURI, { dbName: databaseName });
        return db;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

module.exports = { connectToMongoDB };