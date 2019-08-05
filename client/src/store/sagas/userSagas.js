import { call, put } from "redux-saga/effects"
import { userLoggedIn } from "../actions/auth"
import { createUserFailure } from "../actions/user"
import api from "../../api/api"

export const createUserSaga = function* (action) {
  try {
    const user = yield call(api.user.signup, action.user)
    localStorage.wormbooksJWT = user.token
    yield put(userLoggedIn(user))
  } catch (err) {
    yield put(createUserFailure(err.response.data.errors))
  }
}
