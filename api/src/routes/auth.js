import express from "express"
import jwt from "jsonwebtoken"
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

router.post("/validate_token", (req, res) => {
  const { token } = req.body
  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({})
    }

    res.status(200).json({})
  })
})

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid Token" } })
    }

    User.findOne({ _id: decoded._id }).then(user => {
      if (!user) {
        res
          .status(404)
          .json({ errors: { global: "Invalid Token, user not find" } })
      }
      user.setPassword(password)
      user.save().then(() => res.status(200).json({}))
    })
  })
})

export default router
