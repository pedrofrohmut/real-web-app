import api from "../../api/api"
import { userLoggedIn } from "./auth"

export const signup = data => dispatch =>
  api.user.signup(data).then((user) => {
    localStorage.wormbooksJWT = user.token
    dispatch(userLoggedIn(user))
  })
