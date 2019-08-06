import { call, put } from "redux-saga/effects"
import { userLoggedIn } from "../actions/auth"
import { createUserFailure, fetchCurrentUserFailure } from "../actions/user"
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

export const fetchUserSaga = function* () {
  try {
    const user = yield call(api.user.fetchCurrentUser)
    yield put(userLoggedIn(user))
  } catch (err) {
    yield put(fetchCurrentUserFailure(err.response.data.errors))
  }
}
