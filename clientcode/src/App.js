import React, {Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import BookList from './components/BookList';
import AddBook from './components/AddBook';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


class App extends Component{
  render(){
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Kids Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
 }
}

export default App;


//NOTES:
//ApolloProvider is basically a glue layer b.w the frontend and the backend. It wraps the div and takes data from Apollo when it recieves the data from the server. Then it injects the data into the React application.
//ApolloClient makes requests go to graphql endpoint.
