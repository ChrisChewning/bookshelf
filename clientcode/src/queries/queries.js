import { gql } from 'apollo-boost';


const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
      name
      id
    }
  }
`

//query for single book w specific id. bind the id. get author details. get all the other books the author has written.
const getBookQuery = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author {
        id
        name
        books{
          name
          id
        }
      }
    }
  }
`

export {getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery};

//addBookMutation NOTES:
//b.c it's gql you need the template string.
//b.c it's a mutation you need the mutation keyword.
//refers to schema addBook
//injects the state from AddBook using query variables.
//$ means query variable. ! means non null.
//passes these variables to the fn. inside the fn you can access them.
