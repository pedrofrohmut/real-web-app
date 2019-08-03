import express from "express"
import User from "../models/User"
import parseErrors from "../utils/parseErrors"
import { sendConfirmationEmail } from "../utils/mailer"
import authenticate from "../middlewares/authenticate"

const router = express.Router()

router.post("/", (req, res) => {
  const { email, password } = req.body.newUser
  const user = new User({ email })
  user.setPassword(password)
  user.setConfirmationToken()
  user
    .save()
    .then(savedUser => {
      sendConfirmationEmail(savedUser)
      res.status(200).json({ user: savedUser.toAuthJSON() })
    })
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }))
})

router.get("/current_user", authenticate, (req, res) => {
  res.status(200).json({
    user: {
      email: req.currentUser.email,
      isConfirmed: req.currentUser.isConfirmed,
    },
  })
})

export default router
