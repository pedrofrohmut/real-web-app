import { combineReducers } from "redux"

import userReducer from "./reducers/user"
import booksReducer from "./reducers/books"

export default combineReducers({
  user: userReducer,
  books: booksReducer,
})
