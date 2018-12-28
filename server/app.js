const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://ankush:ankush123@ds145184.mlab.com:45184/gql-poc')

mongoose.connection.once('open', () => {
  console.log("mongoose db is connected")
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log("server is listening for request on port 4000");
});
