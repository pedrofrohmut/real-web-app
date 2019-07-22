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
  },
}
