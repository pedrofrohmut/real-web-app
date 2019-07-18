import express from "express"
import User from "../models/User"

const router = express.Router()

router.post("/", (req, res) => {
  const { credentials } = req.body
  User.findOne({ email: credentials.email }).then(user => {
    if (!user) {
      res.status(400).json({ errors: { global: "E-mail not found." } })
      return
    }

    if (!user.isValidPassword(credentials.password)) {
      res.status(400).json({ errors: { global: "Invalid Credentials." } })
      return
    }

    res.json({ user: user.toAuthJSON() })
  })
})

export default router
