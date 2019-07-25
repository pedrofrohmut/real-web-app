import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types"
import api from "../../api/api"
import {
  setAuthorizationHeaders,
  deleteAuthorizationHeaders,
} from "../../utils/authorizationHeaders"

export const userLoggedIn = function ({ email, token, isConfirmed }) {
  return {
    type: USER_LOGGED_IN,
    user: {
      email,
      token,
      isConfirmed,
    },
  }
}

export const userLoggedOut = function () {
  return {
    type: USER_LOGGED_OUT,
  }
}

export const login = function ({ email, password }) {
  return function (dispatch) {
    return api.user.login({ email, password }).then((user) => {
      localStorage.wormbooksJWT = user.token
      setAuthorizationHeaders(user.token)
      dispatch(
        userLoggedIn({
          email: user.email,
          token: user.token,
          isConfirmed: user.isConfirmed,
        }),
      )
    })
  }
}

export const logout = function () {
  return function (dispatch) {
    localStorage.removeItem("wormbooksJWT")
    deleteAuthorizationHeaders()
    dispatch(userLoggedOut())
  }
}

export const confirm = function (token) {
  return function (dispatch) {
    return api.user.confirm(token).then((user) => {
      localStorage.wormbooksJWT = user.token
      dispatch(
        userLoggedIn({
          email: user.email,
          token: user.token,
          isConfirmed: true,
        }),
      )
    })
  }
}

export const resetPasswordRequest = function ({ email }) {
  return function () {
    return api.user.resetPasswordRequest(email)
  }
}

export const validateToken = function (token) {
  return function () {
    return api.user.validateToken(token)
  }
}

export const resetPassword = function ({ password, token }) {
  return function () {
    return api.user.resetPassword({ password, token })
  }
}
