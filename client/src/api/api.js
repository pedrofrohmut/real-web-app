import axios from "axios"

export default {
  user: {
    login: credentials =>
      axios
        .post("/api/auth", { credentials })
        .then(response => response.data.user),

    signup: newUser =>
      axios
        .post("/api/users", { newUser })
        .then(response => response.data.user),

    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(response => response.data.user),

    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),

    validateToken: token => axios.post("/api/auth/validate_token", { token }),

    resetPassword: ({ password, token }) =>
      axios.post("/api/auth/reset_password", { password, token }),

    fetchCurrentUser: () =>
      axios.get("/api/users/current_user").then(response => response.data.user),
  },
}
