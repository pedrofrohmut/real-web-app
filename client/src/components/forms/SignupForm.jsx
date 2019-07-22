/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from "react"
import { Form, Button } from "semantic-ui-react"
import Validator from "validator"
import PropTypes from "prop-types"
import InlineError from "../messages/InlineError"

const isValidEmail = email => Validator.isEmail(email)

const isValidPassword = password => password !== ""

const isValidForm = (data) => {
  const email = isValidEmail(data.email) ? "" : "Invalid e-mail"
  const password = isValidPassword(data.password)
    ? ""
    : "Password cannot be blank"

  return {
    email,
    password,
  }
}

class SignupForm extends Component {
  state = {
    data: {
      email: "",
      password: "",
    },
    loading: false,
    errors: {
      email: "",
      password: "",
      global: "",
    },
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state.data

    const errors = isValidForm({ email, password })
    this.setState({
      errors: {
        email: errors.email,
        password: errors.password,
      },
    })

    if (!errors.email && !errors.password) {
      this.setState({ loading: true })

      this.props.onSubmit({ email, password }).catch((err) => {
        this.setState(() => ({
          errors: { ...err.response.data.errors },
          loading: false,
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
    const { data, loading, errors } = this.state

    return (
      <Form
        onSubmit={this.handleSubmit}
        loading={loading}
        className="SignupForm"
      >
        <Form.Field>
          <label htmlFor="email">E-Mail</label>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            value={data.email}
            onChange={this.handleChange}
          />

          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>

        <Form.Field>
          <label htmlFor="password">Password</label>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Make a secure password"
            value={data.password}
            onChange={this.handleChange}
          />

          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    )
  }
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SignupForm
