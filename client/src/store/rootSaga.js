import { CREATE_USER_REQUEST } from "./actions/types"
import { createUserSaga } from "./sagas/userSagas"
import { takeLatest } from "redux-saga/effects"

const rootSaga = function* () {
  yield takeLatest(CREATE_USER_REQUEST, createUserSaga)
}

export default rootSaga
