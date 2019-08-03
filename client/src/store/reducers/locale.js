import { LOCALE_SET } from "../actions/types"

const INITIAL_STATE = {
  lang: "pt",
}

const localeReducer = function (state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case LOCALE_SET:
      return { ...newState, lang: action.lang }

    default:
      return newState
  }
}

export default localeReducer
