import express from "express"
import User from "../models/User"
import { sendResetPasswordEmail } from "../utils/mailer"

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

router.post("/confirmation", (req, res) => {
  const { token } = req.body

  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", isConfirmed: true },
    { new: true }
  ).then(user =>
    user
      ? res.status(200).json({ user: user.toAuthJSON() })
      : res.status(400).json({})
  )
})

router.post("/reset_password_request", (req, res) => {
  const { email } = req.body

  User.findOne({ email }).then(user => {
    if (!user) {
      res
        .status(400)
        .json({ errors: { global: "No user with this e-mail not found." } })
    }

    sendResetPasswordEmail(user)
    res.status(200).json({})
  })
})

export default router
