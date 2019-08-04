const INITIAL_STATE = []

const charactersReducer = function (state = INITIAL_STATE, action) {
  const newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    default:
      return newState
  }
}

export default charactersReducer
