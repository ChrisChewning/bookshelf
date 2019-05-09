const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');


const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql  //from graphQL package.
const _ = require('lodash');


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){ // fn looks at data and determins what is needed.
        return Author.findById(parent.authorId); //look in the Author collection for any book (parent) record with the author id.
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
      type: new GraphQLList(BookType), //GraphQLList b.c it could be >1 of BookType
      resolve(parent, args){
        return Book.find({ authorId:parent.id }); //list of books associated w author
        //lodash was return _.filter(books, {authorId:parent.id});
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
    books:{ //so you can query all the books.
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({}); //empty obj returns all books bc they all match
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
    addAuthor: { //allows user to add author to db
      type: AuthorType,
      args: { //what they want to send from the frontend.
        name: {type: GraphQLString}
      },
      resolve(parent, args){
        let author = new Author({ //this is to the Author model.
          name: args.name
        });
        return author.save(); //save method from Mongoose. return what you save in db.
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID}
      },
      resolve(parent, args){
        let book = new Book({ //using Book model.
        name: args.name,
        genre: args.genre,
        authorId: args.authorId
      });
      return book.save();
    }
  }
}
})



//defining which query we're allowing the user to use.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
