import { BOOKS_FETCH } from "../actions/types"

const INITIAL_STATE = {}

const booksReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOKS_FETCH:
      return { ...state, ...action.data.entities.books }

    default:
      return state
  }
}

export default booksReducer
