import { combineReducers } from "redux"

import userReducer from "./reducers/user"
import localeReducer from "./reducers/locale"
import charactersReducer from "./reducers/characters"

export default combineReducers({
  characters: charactersReducer,
  locale: localeReducer,
  user: userReducer,
})
