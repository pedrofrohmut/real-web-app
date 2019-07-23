/* eslint-disable react/no-access-state-in-setstate */
import React from "react"
import Validator from "validator"
import PropTypes from "prop-types"
import { Form, Button, Message } from "semantic-ui-react"
import InlineError from "../messages/InlineError"

const isValidEmail = email => Validator.isEmail(email)

const isValidForm = (data) => {
  const email = isValidEmail(data.email) ? "" : "Invalid e-mail"
  return {
    email,
  }
}

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: "",
    },
    isLoading: false,
    errors: {
      email: "",
      global: "",
    },
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { email } = this.state.data

    const errors = isValidForm({ email })
    this.setState({
      ...this.state,
      errors: {
        ...this.state.errors,
        email: errors.email,
      },
    })

    if (!errors.email) {
      this.setState({
        isLoading: true,
      })

      this.props.onSubmit({ email }).catch((err) => {
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
        onSubmit={this.handleSubmit}
        loading={isLoading}
        className="ForgotPasswordForm"
      >
        {errors.global && (
          <Message
            negative
            header="An error has occured"
            content={errors.global}
          />
        )}

        <Form.Field>
          <label htmlFor="email">E-mail</label>

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

        <Button primary>Send me a e-mail</Button>
      </Form>
    )
  }
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default ForgotPasswordForm
