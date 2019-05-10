import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

class BookList extends Component {
   displayBooks(){
     var data = this.props.data;
     if(data.loading){
       return (<div>Loading books...</div>)
     } else {
       return data.books.map(book => {
         return(
         <li key={book.id}>{book.name}</li>
       )
      })
     }
   }

  render(){
    return(
      <div id>
        <ul id="book-list">
          {this.displayBooks()}
       </ul>
      </div>
    )
  }

}

export default graphql(getBooksQuery)(BookList);
//bind this query to this component. now inside the component you have access to this data. it is stored in the component's props. you can console.log(this.props)

//this.display.books   this = component. displayBooks() is the method inside.
