const mongoose = require('mongoose');
require('dotenv').config();
const { connectToMongoDB } = require('../mongodb');

const db1 = connectToMongoDB(process.env.MONGODB_CONNECTION_URI, process.env.MONGODB_DATABASE_1);

const writerSchema = mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    nationality: { type: String },
    birthdate: { type: String },
    deathdate: { type: String },
    genres: [{ type: String }],
    books: [{ type: String }],
    debut_year: { type: Number },
    wid: { type: String, required: true, unique: true }
});
const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String },
    publication_year: { type: Number },
    pages: { type: Number },
    summary: { type: String },
    writers: [{ type: String }],
    ISBN: { type: String, required: true, unique: true },
    language: { type: String },
    publisher: { type: String },
    bid: { type: String, required: true, unique: true }
});
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    apikeys: [{ type: String }],
    role: { type: String, enum: ['admin', 'user'], required: true },
    email: { type: String, required: true, unique: true }
});

const writers = db1.model('writers', writerSchema);
const books = db1.model('books', bookSchema);
const users = db1.model('users', userSchema);

module.exports = { writers, books, users };