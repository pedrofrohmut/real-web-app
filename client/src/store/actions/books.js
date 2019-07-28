import { normalize } from "normalizr"
import { BOOKS_FETCH, BOOK_CREATED } from "./types"
import api from "../../api/api"
import { bookSchema } from "../../schemas"

// data.entities.books
const booksFetched = function (data) {
  return {
    type: BOOKS_FETCH,
    data,
  }
}

const bookCreated = function (data) {
  return {
    type: BOOK_CREATED,
    data,
  }
}

export const fetchBooks = function () {
  return function (dispatch) {
    return api.books
      .fetchAll()
      .then(books => dispatch(booksFetched(normalize(books, [bookSchema]))))
  }
}

export const createBook = function (newBook) {
  return function (dispatch) {
    return api.books
      .create(newBook)
      .then(book => dispatch(bookCreated(normalize(book, bookSchema))))
  }
}
