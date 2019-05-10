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

export {getBooksQuery, getAuthorsQuery, addBookMutation};

//addBookMutation NOTES:
//b.c it's gql you need the template string.
//b.c it's a mutation you need the mutation keyword.
//refers to schema addBook
//injects the state from AddBook using query variables.
//$ means query variable. ! means non null.
//passes these variables to the fn. inside the fn you can access them.
