import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookDetailsQuery } from '../queries/queries'

class BookDetails extends Component {

  displayBookDetails = () => {
    const {book} = this.props.data
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>Genre: <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{book.genre}</span></p>
          <p>Author: <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{book.author.name}</span></p>
          <p>All Books by same author:</p>
          <ul className="other-books">
            {
              book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))
            }
          </ul>
        </div>
      )
    }
    return (
      <div>No Book selected...</div>
    )
  }

  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id
      }
    }
  }
})(BookDetails);
