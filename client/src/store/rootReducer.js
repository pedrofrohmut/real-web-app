import { combineReducers } from "redux"

import userReducer from "./reducers/user"
import booksReducer from "./reducers/books"
import localeReducer from "./reducers/locale"

export default combineReducers({
  user: userReducer,
  books: booksReducer,
  locale: localeReducer,
})
