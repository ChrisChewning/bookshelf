const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql
//destructures. grab diff. properties from graphql package.
const _ = require('lodash');

//dummy data
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', },
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', },
  {name: 'The Long Earth', genre: 'Sci Fi', id: '3', }
];


//define our 1st object type, BookType
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

//defines how we initially jump into the graph. the fields are the options on how to do so.
const RootQuery = newGraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book:{ //when someone queries a book,use this object to get it.
      type: BookType,
      args: {id: { type: GraphQLString}}, //args we expect to go w the query.
      resolve(parent, args){ //resolve fn finds the data.
        //fn to get data from db/other source. args is the id field.
        return _.find(books, {id: args.id}); //use lodash to look through books array.
      }
    }
  }
})


//defining which query we're allowing the user to use.
module.exports = new GraphQLSChema({
  query.RootQuery
});
