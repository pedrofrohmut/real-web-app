import React from "react"
import { Form, Button } from "semantic-ui-react"
import Validator from "validator"
import InlineError from "../messages/InlineError"
import PropTypes from "prop-types"

const isValidPassword = password => password !== ""

const isValidEmail = email => Validator.isEmail(email)

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    }
  }

  isValidForm = () => {
    const email = isValidEmail(this.state.email) ? "" : "Invalid E-mail"
    const password = isValidPassword(this.state.password)
      ? ""
      : "Password cannot be blank"

    this.setState(state => ({
      errors: { email, password },
    }))

    if (!email && !password) {
      return true
    }
    return false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    if (this.isValidForm()) {
      this.props.onSubmit({ email, password })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { errors } = this.state

    return (
      <Form className="LoginForm" onSubmit={this.handleSubmit}>
        <Form.Field error={errors.email !== ""}>
          <label>E-mail</label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            value={this.state.email}
            onChange={this.handleChange}
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
            value={this.state.password}
            onChange={this.handleChange}
          />

          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Log in</Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
