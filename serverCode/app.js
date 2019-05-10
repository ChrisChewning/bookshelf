const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://chewningcl:Redsox19!@bookcluster-fzerv.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

mongoose.connection.once('open', () => {
  useNewUrlParser: true
  console.log('connected to db')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.listen(4000, () => {
  console.log('listening for req\'s on port 4000');
})



//notes:
//app.use is called every time the req to /graphql happens.
//schema calls the schema you have set. it's the same as schema: schemaa. JS6.
//allow cors for cross origin req's b.w serverside and clientside
//app.use() cors and graphql are both middleware
