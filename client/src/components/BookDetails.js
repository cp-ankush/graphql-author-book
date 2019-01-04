import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookDetailsQuery } from '../queries/queries'
import { REST_APIS } from '../consts'
import isEmpty from 'lodash/isEmpty'

import {
  getBook,
  getAuthor,
  getBooksByAuthorId
} from '../rest-apis'

class BookDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      author: '',
      books: [],
      loader: false
    }
  }

  componentDidMount() {
    if (REST_APIS) {
      this.getData(this.props)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id && !REST_APIS) {
      this.setState({
        loader: true
      })
    }
    if (!REST_APIS) {
      const {book: prevBook} = this.props.data
      const {book} = nextProps.data
      const prevId = prevBook && prevBook.id? prevBook.id : ''
      const bookId = book && book.id? book.id : ''
      if (prevId !== bookId) {
        this.setState({
          loader: false
        })
      }
    }
    if (nextProps.id !== this.props.id && REST_APIS) {
      this.getData(nextProps)
    }
  }

  getData = (props) => {
    const { authorId, name, id } = props
    if (authorId) {
      this.setState({
        loader: true
      }, () => {
        getBook(id).then((book) => {
          getAuthor(authorId).then((res) => {
            getBooksByAuthorId(authorId).then((response) => {
              this.setState({
                author: res.name,
                books: response,
                loader: false
              })
            })
          })
        })
      })
    }
  }

  displayBookDetails = () => {
    if (!REST_APIS) {
      const {book} = this.props.data
      if (book && !this.state.loader) {
        this.props.loader && this.props.changeLoader(false)
        return (
          <div>
            <h2>{book.name}</h2>
            <p>Genre: <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{book.genre}</span></p>
            <p>Author: <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{book.author.name}</span></p>
            <p>All Books by same author:</p>
            <ul className="other-books">
              {
                book.author.books.map((item, index) => (
                  <li key={index}>
                    <span>
                      {item.name}
                    </span>
                    {
                      item.genre &&
                      <span>{`-------Genre: ${item.genre}`}</span>
                    }
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
      return (
        <div>
          {
            this.props.loader || this.state.loader?
            'Loading...' :
            'No Book selected'
          }
        </div>
      )
    } else {
      const {author, books, loader} = this.state
      const {name, genre} = this.props
      if (name && !loader) {
        this.props.loader && this.props.changeLoader(false)
        return (
          <div>
            <h2>{name}</h2>
            <p>Genre: <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{genre}</span></p>
            <p>Author: <span style={{fontWeight: 'bold', fontSize: '1.2em'}}>{author}</span></p>
            <p>All Books by same author:</p>
            <ul className="other-books">
              {
                books.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))
              }
            </ul>
          </div>
        )
      }
      return (
        <div>
          {
            this.props.loader || this.state.loader?
            'Loading...' :
            'No Book selected'
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}
      </div>
    );
  }
}

// export default BookDetails

export default graphql(getBookDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id
      }
    }
  }
})(BookDetails);
