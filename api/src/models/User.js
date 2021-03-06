import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"

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
    confirmationToken: { type: String, default: "" },
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
      isConfirmed: this.isConfirmed,
    },
    process.env.JWT_SECRET
  )
}

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  )
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT()
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

schema.methods.generateConfirmationURL = function generateConfirmationURL() {
  const confirmationURL = `${process.env.HOST}/confirmation/${this.confirmationToken}`
  return confirmationURL
}

schema.methods.generateResetPasswordURL = function generateResetPasswordURL() {
  const resetPasswordURL = `${
    process.env.HOST
  }/reset_password/${this.generateResetPasswordToken()}`
  return resetPasswordURL
}

export default mongoose.model("User", schema)
