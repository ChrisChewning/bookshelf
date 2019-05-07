const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

//middleware
app.use('/graphql', graphqlHTTP({

}));
//this fn happens whenever the req to /graphql happens.


app.listen(4000, () => {
  console.log('listening for req\'s on port 4000');
})
