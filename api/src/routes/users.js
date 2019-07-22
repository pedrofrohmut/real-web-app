import express from "express"
import User from "../models/User"
import parseErrors from "../utils/parseErrors"

const router = express.Router()

router.post("/", (req, res) => {
  console.log("REQ_BODY", req.body.newUser)
  const { email, password } = req.body.newUser
  const user = new User({ email })
  user.setPassword(password)
  user
    .save()
    .then(savedUser => res.status(200).json({ user: savedUser.toAuthJSON() }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }))
})

export default router
