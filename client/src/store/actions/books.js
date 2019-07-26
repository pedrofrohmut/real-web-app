import { normalize } from "normalizr"
import { BOOKS_FETCH } from "./types"
import api from "../../api/api"
import { bookSchema } from "../../schemas"

// data.entities.books
const booksFetched = function (data) {
  return {
    type: BOOKS_FETCH,
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
