import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import Validator from "validator"
import InlineError from "../messages/InlineError"
import PropTypes from "prop-types"

const INITIAL_ERRORS = {
  email: "",
  password: "",
}

const INITIAL_DATA = {
  email: "",
  password: "",
}

const isValidPassword = password => password !== ""

const isValidEmail = email => Validator.isEmail(email)

const LoginForm = ({ onSubmit }) => {
  const [data, setData] = useState(INITIAL_DATA)
  const [errors, setErrors] = useState(INITIAL_ERRORS)

  // const [loading, setLoading] = useState(false)

  const isValidForm = () => {
    setErrors({
      password: isValidPassword(data.password)
        ? ""
        : "Password cannot be blank",
      email: isValidEmail(data.email) ? "" : "Invalid E-mail",
    })

    if (!isValidEmail(data.email)) {
      return false
    }

    if (!isValidPassword(data.password)) {
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValidForm()) {
      onSubmit({ email: data.email, password: data.password })
    }
  }

  const { email, password } = data

  return (
    <Form className="LoginForm" onSubmit={e => handleSubmit(e)}>
      <Form.Field error={errors.email !== ""}>
        <label>E-mail</label>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          value={email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        {errors.email && <InlineError text={errors.email} />}
      </Form.Field>

      <Form.Field error={errors.password !== ""}>
        <label>Password</label>

        <input
          type="password"
          name="password"
          id="password"
          placeholder="your user password"
          value={password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        {errors.password && <InlineError text={errors.password} />}
      </Form.Field>

      <Button primary>Log in</Button>
    </Form>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
