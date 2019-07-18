import axios from "axios"

export default {
  user: {
    login: credentials => axios.post("/api/auth", { credentials }).then((response) => {
      console.log(response.data.user)
      return response.data.user
    }),
  },
}
