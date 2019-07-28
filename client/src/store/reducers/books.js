import { BOOKS_FETCH, BOOK_CREATED } from "../actions/types"

const INITIAL_STATE = {}

const booksReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOKS_FETCH:
    case BOOK_CREATED:
      return { ...state, ...action.data.entities.books }

    default:
      return state
  }
}

export default booksReducer
