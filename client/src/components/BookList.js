import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'
import BookDetails from './BookDetails'
import { REST_APIS } from '../consts'
import isEmpty from 'lodash/isEmpty'

import {
  getBooks,
  getBook
} from '../rest-apis'

class BookList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: '',
      name: '',
      books: [],
      loader: false
    }
  }

  componentDidMount() {
    if (REST_APIS) {
      getBooks().then((books) => {
        this.setState({books})
      })
    }
  }

  renderBooks = () => {
    if (!REST_APIS) {
      const {data} = this.props
      if (data.loading) {
        return (
          <div>Loading Books...</div>
        )
      }
      return (
        data.books.map((item) => (
          <li key={item.id} onClick={() => this.setState({id: item.id, loader: true})}>{item.name}</li>
        ))
      )
    } else {
      const {books} = this.state
      if (isEmpty(books)) {
        return (
          <div>Loading Books...</div>
        )
      }
      return (
        books.map((item) => (
          <li key={item._id} onClick={() => this.setState({
              id: item._id,
              name: item.name,
              authorId: item.authorId,
              genre: item.genre,
              loader: true
            })}>{item.name}</li>
        ))
      )
    }
  }

  changeLoader = (value) => {
    this.setState({
      loader: false
    })
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {
            this.renderBooks()
          }
        </ul>
        <BookDetails
          id={this.state.id}
          name={this.state.name}
          genre={this.state.genre}
          authorId={this.state.authorId}
          loader={this.state.loader}
          changeLoader={this.changeLoader}
          />
      </div>
    );
  }
}

// export default BookList
export default graphql(getBookQuery)(BookList);
