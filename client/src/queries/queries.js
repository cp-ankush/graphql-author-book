import { gql } from 'apollo-boost'

export const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

export const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`

export const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

export const getBookDetailsQuery = gql`
  query($id: ID){
    book(id: $id) {
      name
      genre
      id
      author @defer {
        name
        books @defer {
          name
        }
      }
    }
  }
`
