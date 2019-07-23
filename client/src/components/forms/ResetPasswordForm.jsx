import React from "react"
import PropTypes from "prop-types"
import { Form, Button } from "semantic-ui-react"
import InlineError from "../messages/InlineError"

const isValidPassword = password => password !== ""

const isValidConfirmPassword = confirmPassword => confirmPassword !== ""

const isConfirmPasswordMatch = (password, confirmPassword) =>
  password === confirmPassword

const isValidForm = (data) => {
  const password = isValidPassword(data.password)
    ? ""
    : "Password cannot be blank"
  const confirmPassword = isValidConfirmPassword(data.confirmPassword)
    ? ""
    : "Confirm Password cannot be blank"
  const passwordsMatch = isConfirmPasswordMatch(
    data.password,
    data.confirmPassword,
  )
    ? ""
    : "Password and Confirm Password do not match"
  return {
    password,
    confirmPassword,
    passwordsMatch,
  }
}

class ResetPasswordForm extends React.Component {
  state = {
    data: {
      token: this.props.token,
      password: "",
      confirmPassword: "",
    },
    isLoading: false,
    errors: {
      token: "",
      password: "",
      confirmPassword: "",
      passwordsMatch: "",
      global: "",
    },
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { password, confirmPassword } = this.state.data

    const errors = isValidForm({ password, confirmPassword })
    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        ...errors,
      },
    })

    if (!errors.password && !errors.confirmPassword && !errors.passwordsMatch) {
      this.setState({
        isLoading: true,
      })

      this.props.onSubmit({ password }).catch((err) => {
        this.setState(state => ({
          ...state,
          errors: {
            ...state.errors,
            ...err.response.data.errors,
          },
          isLoading: false,
        }))
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value,
      },
    })
  }

  render() {
    const { data, isLoading, errors } = this.state

    return (
      <Form
        loading={isLoading}
        onSubmit={this.handleSubmit}
        className="ResetPasswordForm"
      >
        <Form.Field>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Insert here your new secure and secret password"
            value={data.password}
            onChange={this.handleChange}
          />

          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Form.Field>
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password here. Both must Match"
            value={data.confirmPassword}
            onChange={this.handleChange}
          />

          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword} />
          )}
          {errors.passwordsMatch && (
            <InlineError text={errors.passwordsMatch} />
          )}
        </Form.Field>

        <Button primary>Reset</Button>
      </Form>
    )
  }
}

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default ResetPasswordForm
