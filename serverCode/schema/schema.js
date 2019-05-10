const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return Author.findById(parent.authorId);
        //look in Author collection for any book (parent) record w authorId.
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    books:{ //child
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({ authorId:parent.id });
        //list of books associated w author. note: not findById
      }
    }
  })
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book:{
      type: BookType,
      args: {id: { type: GraphQLID}},
      resolve(parent, args){
        return Book.findById(args.id);
      }
    },
    author:{
      type:  AuthorType,
      args: { id: {type: GraphQLID} },
      resolve(parent, args){
        return Author.findById(args.id);
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
        resolve(parent, args){
          return Author.find({});
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields:{
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args){
        let book = new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId
      });
      return book.save();
    }
  }
}
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});


//NOTES:
//set what you want out of the graphQL package in the object.

//RootQuery defines how we initially jump into the graph.
//The fields are the options on how to do so. ex: book is when someone queries a book you look in RottQuery, then the book object. Then you see the type, which sets the schema, the args, which go with the query, and resolve, which finds the data from your db or other source. You return will be to the id or an empty obj, b.c an empty obj will match everything.


//Mutation allows changes.
//Your type needs to match up with what's already set (AuthorType, BookType). args is what needs to be sent from the frontend. The resolve fn let book = new Book is saying to use the Book model from Mongoose and set those properties. The  save method is from Mongoose. You want to return what you've saved there.

//export what we're allowing the user to use.
