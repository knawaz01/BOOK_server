// server/models/Book.js

const mongoose = require('mongoose');

// MongoDB schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  image: String,
  description: String
});

const Book = new mongoose.model('Book', bookSchema);

module.exports = Book;
