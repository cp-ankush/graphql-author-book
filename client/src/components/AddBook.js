import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBookQuery } from '../queries/queries'

class AddBook extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bookName: '',
      genre: '',
      authorId: ''
    }
  }

  renderAuthors = () => {
    const data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (
        <option disabled>Loading Authors...</option>
      )
    }
    return (
      data.authors.map((author) => (
        <option key={author.id} value={author.id}>{author.name}</option>
      ))
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {bookName, genre, authorId} = this.state
    this.props.addBookMutation({
      variables: {
        name: bookName,
        genre,
        authorId
      },
      refetchQueries: [{ query: getBookQuery }]
    })
  }

  render() {
    return (
      <form id="add-book" onSubmit={this.handleSubmit}>
        <div className="field">
          <label>Book Name:</label>
          <input type="text" onChange={(e) => this.setState({bookName: e.target.value})}/>
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={(e) => this.setState({genre: e.target.value})}/>
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => this.setState({authorId: e.target.value})}>
            <option>Select Author</option>
            {this.renderAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: 'getAuthorsQuery'}),
  graphql(addBookMutation, {name: 'addBookMutation'})
)(AddBook);
