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
      errors: {
        email: "",
        password: "",
        global: "",
      },
      loading: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state

    const errors = isValidForm({ email, password })
    this.setState({
      errors: { email: errors.email, password: errors.password },
    })

    if (!errors.email && !errors.password) {
      this.setState({ loading: true })
      // eslint-disable-next-line react/destructuring-assignment
      this.props.onSubmit({ email, password }).catch((err) => {
        if (err.response.data.errors) {
          this.setState(() => ({
            errors: { global: err.response.data.errors.global },
          }))
        }
        this.setState(() => ({
          loading: false,
        }))
      })
    }

    e.preventDefault()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const {
      email, password, errors, loading,
    } = this.state

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

        <Form.Field>
          <label>E-mail</label>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            value={email}
            onChange={this.handleChange}
          />

          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field>
          <label>Password</label>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="your user password"
            value={password}
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
