import axios from "axios"

export const setAuthorizationHeaders = function (token = undefined) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
}

export const deleteAuthorizationHeaders = function () {
  delete axios.defaults.headers.common.Authorization
}
