import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import Validator from "validator"

const LoginForm = () => {
  const [errors, setErrors] = useState({})

  // const [loading, setLoading] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const validateForm = () => {
    setErrors({})
    if (data.password === "") {
      setErrors({ ...errors, password: "Password cannot be blank" })
    }
    if (!Validator.isEmail(data.email)) {
      setErrors({ ...errors, email: "Invalid Email" })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    validateForm()
  }

  const { email, password } = data

  return (
    <Form className="LoginForm" onSubmit={e => handleSubmit(data, e)}>
      <Form.Field>
        <labeL>E-mail</labeL>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          value={email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />
      </Form.Field>

      <Form.Field>
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="your user password"
          value={password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />
      </Form.Field>

      <Button primary>Log in</Button>
    </Form>
  )
}
export default LoginForm
