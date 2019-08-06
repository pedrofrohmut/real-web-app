import { CREATE_USER_REQUEST, FETCH_CURRENT_USER_REQUEST } from "./actions/types"
import { createUserSaga, fetchUserSaga } from "./sagas/userSagas"
import { takeLatest } from "redux-saga/effects"

const rootSaga = function* () {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga)
  yield takeLatest(FETCH_CURRENT_USER_REQUEST, fetchUserSaga)
}

export default rootSaga
