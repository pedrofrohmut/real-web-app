import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  FETCH_CURRENT_USER_SUCCESS,
} from "../actions/types"

const INITIAL_STATE = {
  email: undefined,
  token: undefined,
  isConfirmed: false,
  isLoading: true,
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

    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        ...action.user,
        isLoading: false,
      }

    default:
      return state
  }
}

export default userReducer
