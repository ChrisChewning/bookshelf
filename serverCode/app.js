const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')

const app = express();

//middleware
app.use('/graphql', graphqlHTTP({
  schema //same as schema: schema. just JS6.
}));


app.listen(4000, () => {
  console.log('listening for req\'s on port 4000');
})



//notes:
//this fn happens whenever the req to /graphql happens.
//graphql has to have a schema, which is what's inside the object.
