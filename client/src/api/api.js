import axios from "axios"

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then((response) => {
        console.log(response.data.user)
        return response.data.user
      }),

    signup: newUser =>
      axios.post("/api/users", { newUser }).then((response) => {
        console.log("NEW USER", newUser)
        console.log(response.data.user)
        return response.data.user
      }),
  },
}
