import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/types"

const INITIAL_STATE = {
  email: undefined,
  token: undefined,
  isConfirmed: false,
}

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        email: action.user.email,
        token: action.user.token,
        isConfirmed: action.user.isConfirmed ? action.user.isConfirmed : false,
      }

    case USER_LOGGED_OUT:
      return {}

    default:
      return state
  }
}

export default userReducer
