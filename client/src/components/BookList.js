import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }

  renderBooks = () => {
    const {data} = this.props
    if (data.loading) {
      return (
        <div>Loading Books...</div>
      )
    }
    return (
      data.books.map((item) => (
        <li key={item.id} onClick={() => this.setState({id: item.id})}>{item.name}</li>
      ))
    )
  }

  render() {
    return (
      <div>
        <ul id="book-list">
          {
            this.renderBooks()
          }
        </ul>
        <BookDetails id={this.state.id}/>
      </div>
    );
  }
}

export default graphql(getBookQuery)(BookList);
