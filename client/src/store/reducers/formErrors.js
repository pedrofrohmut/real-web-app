import { CREATE_USER_REQUEST, CREATE_USER_FAILURE } from "../actions/types"

const INITIAL_STATE = {
  signup: {},
}

const formErrorsReducer = function (state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case CREATE_USER_REQUEST:
      return { ...newState, signup: {} }

    case CREATE_USER_FAILURE:
      return { ...newState, signup: action.errors }

    default:
      return newState
  }
}

export default formErrorsReducer
