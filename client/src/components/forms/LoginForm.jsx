import React from "react"
import { Form, Button, Message } from "semantic-ui-react"
import Validator from "validator"
import InlineError from "../messages/InlineError"
import PropTypes from "prop-types"

const isValidPassword = password => password !== ""

const isValidEmail = email => Validator.isEmail(email)

const isValidForm = (data) => {
  const email = isValidEmail(data.email) ? "" : "Invalid E-mail"
  const password = isValidPassword(data.password)
    ? ""
    : "Password cannot be blank"

  return {
    email,
    password,
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state

    const errors = isValidForm({ email, password })
    this.setState({ errors: { ...this.state.errors, ...errors } })

    if (!errors.email && !errors.password) {
      this.setState({ loading: true })
      this.props.onSubmit({ email, password }).catch((err) => {
        this.setState({
          errors: { global: err.response.data.error.global },
          loading: false,
        })
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { errors, loading } = this.state

    return (
      <Form
        className="LoginForm"
        onSubmit={this.handleSubmit}
        loading={loading}
      >
        {errors.global && (
          <Message negative>
            <Message.Header>Something went wrong</Message.Header>
            <p>{errors.global}</p>
          </Message>
        )}

        <Form.Field error={errors.email && errors.email !== ""}>
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

        <Form.Field error={errors.password && errors.password !== ""}>
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
