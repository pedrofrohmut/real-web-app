import { USER_FETCHED, CREATE_USER_REQUEST, CREATE_USER_FAILURE } from "./types"
import api from "../../api/api"
import { userLoggedIn } from "./auth"

export const userFetched = user => ({
  type: USER_FETCHED,
  user,
})

export const createUserRequest = user => ({
  type: CREATE_USER_REQUEST,
  user,
})

export const createUserFailure = errors => ({
  type: CREATE_USER_FAILURE,
  errors,
})

export const signup = data => dispatch =>
  api.user.signup(data).then((user) => {
    localStorage.wormbooksJWT = user.token
    dispatch(userLoggedIn(user))
  })

export const fetchCurrentUser = () => dispatch =>
  api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)))
