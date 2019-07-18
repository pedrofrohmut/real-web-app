import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types"
import api from "../../api/api"

export const userLoggedIn = function ({ email, token }) {
  return {
    type: USER_LOGGED_IN,
    user: {
      email,
      token,
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
      dispatch(userLoggedIn({ email: user.email, token: user.token }))
    })
  }
}

export const logout = function () {
  return function (dispatch) {
    localStorage.removeItem("wormbooksJWT")
    dispatch(userLoggedOut())
  }
}
