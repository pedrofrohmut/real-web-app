import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"

// TODO: to e-mail field => add unique and e-mail valid pattern
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    isConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
)

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
    },
    process.env.JWT_SECRET
  )
}

schema.methods.setPassword = function setPassword(password) {
  const saltRounds = 10
  this.passwordHash = bcrypt.hashSync(password, saltRounds)
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    isConfirmed: this.isConfirmed,
    token: this.generateJWT(),
  }
}

schema.plugin(uniqueValidator, { message: "This e-mail is already taken" })

export default mongoose.model("User", schema)
