import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/types"

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        email: action.user.email,
        token: action.user.token,
      }

    case USER_LOGGED_OUT:
      return {}

    default:
      return state
  }
}
