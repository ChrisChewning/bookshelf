const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to db
mongoose.connect('mongodb+srv://chewningcl:Redsox19!@bookcluster-fzerv.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', () => {
  console.log('connected to db')
})


//middleware
app.use('/graphql', graphqlHTTP({
  schema, //same as schema: schema. just JS6.
  graphiql: true
}));


app.listen(4000, () => {
  console.log('listening for req\'s on port 4000');
})



//notes:
//this fn happens whenever the req to /graphql happens.
//graphql has to have a schema, which is what's inside the object.
