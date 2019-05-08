const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql
//destructures. grab diff. properties from graphql package.
const _ = require('lodash');

//dummy data
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2',  authorId: '2'},
  {name: 'The Long Earth', genre: 'Sci Fi', id: '3', authorId: '3'}
];

var authors = [
  {name: 'Patrick Rothfuss', id: '1'},
  {name: 'Brandon Sanderson', id: '2'},
  {name: 'Terry Pratchett', id: '3'}
]


//define our 1st object type, BookType
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return _.find(authors, {id: parent.authorId});  //look in authors array. which one matches book query.
      } //resolve fn looks at data and determins what is needed.
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    books:{ //child
      type: new GraphQLList(BookType), //GraphQLList b.c it could be >1 of BookType
      resolve(parent, args){
        return _.filter(books, {authorId:parent.id}); //we take the parent id and look in the books array. we are looking for a match for the authorid that matches parent.id. everything else we filter out the array.
      }
    }
  })
});


//defines how we initially jump into the graph. the fields are the options on how to do so.
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book:{ //when someone queries a book,use this object to get it.
      type: BookType,
      args: {id: { type: GraphQLID}}, //args we expect to go w the query.
      resolve(parent, args){ //resolve fn finds the data.
        //fn to get data from db/other source. args is the id field.
        return _.find(books, {id: args.id}); //use lodash method to look through books array.
      }
    },
    author:{
      type:  AuthorType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        return _.find(authors, {id: args.id});  //look through array and match the args.id (query) to the id.
      }
    },
    books:{ //so you can query all the books.
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return books  //entire list of books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
        resolve(parent, args){
          return authors
      }
    }

  }
})


//defining which query we're allowing the user to use.
module.exports = new GraphQLSchema({
  query: RootQuery
});
