export const getBooks = () => {
  return fetch('http://localhost:4000/books').then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

export const getBook = (id) => {
  return fetch(`http://localhost:4000/book?id=${id}`).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

export const getAuthors = () => {
  return fetch('http://localhost:4000/authors').then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

export const getAuthor = (id) => {
  return fetch(`http://localhost:4000/author?id=${id}`).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

export const getBooksByAuthorId = (id) => {
  return fetch(`http://localhost:4000/booksByAuthor?authorId=${id}`).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}
