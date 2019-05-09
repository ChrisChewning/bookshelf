import React, {Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; //glue layer.

import BookList from './components/BookList';

//apollo client setup to make requests to graphql endpoint.
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
      </div>
    </ApolloProvider>
  );
 }
}

export default App;

//ApolloProvider wraps the div. It takes data from Apollo when receives it from server and inject into React application.
