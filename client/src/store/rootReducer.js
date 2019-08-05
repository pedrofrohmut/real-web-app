import { combineReducers } from "redux"

import userReducer from "./reducers/user"
import localeReducer from "./reducers/locale"
import charactersReducer from "./reducers/characters"
import formErrorsReducer from "./reducers/formErrors"

export default combineReducers({
  characters: charactersReducer,
  locale: localeReducer,
  user: userReducer,
  formErrors: formErrorsReducer,
})
