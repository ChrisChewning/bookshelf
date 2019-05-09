import React from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import ApolloProvider from 'react-apollo'; //glue layer.

//apollo client setup to make requests to graphql endpoint.
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


function App() {
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
