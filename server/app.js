const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose')
const cors = require('cors')
const Book = require('./models/book')
const Author = require('./models/author')

const app = express();
app.use(cors())

mongoose.connect('mongodb://ankush:ankush123@ds145184.mlab.com:45184/gql-poc')

mongoose.connection.once('open', () => {
  console.log("mongoose db is connected")
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/books', (request, res) => {
  Book.find({}, (err, books) => {
    res.send(books);
  })
})

app.get('/book', (request, res) => {
  const id = request.query.id
  Book.findById(id, (err, book) => {
    res.send(book);
  })
})

app.get('/authors', (request, res) => {
  Author.find((err, authors) => {
    res.send(authors);
  })
})

app.get('/author', (request, res) => {
  const id = request.query.id
  Author.findById(id, (err, author) => {
    res.send(author);
  })
})

app.get('/booksByAuthor', (request, res) => {
  const authorId = request.query.authorId
  Book.find({authorId}, (err, books) => {
    res.send(books);
  })
})

app.listen(4000, () => {
  console.log("server is listening for request on port 4000");
});
