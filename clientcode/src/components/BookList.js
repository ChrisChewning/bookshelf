import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';  //not {BookDetails}

class BookList extends Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null //keeps track of which book is clicked on.
    }
  }

   displayBooks(){
     var data = this.props.data;
     if(data.loading){
       return (<div>Loading books...</div>)
     } else {
       return data.books.map(book => {
         return(
         <li key={book.id} onClick={ (e) => {this.setState({selected: book.id})}}>{book.name}</li>
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
       <BookDetails bookId={this.state.selected}/>
      </div>
    )
  }

}
//prop on BookDetails componenet will update when we click on diff. books

export default graphql(getBooksQuery)(BookList);
//bind this query to this component. now inside the component you have access to this data. it is stored in the component's props. you can console.log(this.props)

//this.display.books   this = component. displayBooks() is the method inside.
