import React from "react"
import { connect } from "react-redux"
import { Container, Message } from "semantic-ui-react"
import PropTypes from "prop-types"
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm"
import { resetPasswordRequest } from "../store/actions/auth"

class ForgotPasswordPage extends React.Component {
  state = {
    success: false,
  }

  handleSubmit = data =>
    this.props.resetPasswordRequest(data).then(() =>
      this.setState({
        success: true,
      }))

  render() {
    const { success } = this.state

    return (
      <Container className="ForgotPasswordPage">
        {success ? (
          <Message>E-mail has been sent.</Message>
        ) : (
          <ForgotPasswordForm onSubmit={this.handleSubmit} />
        )}
      </Container>
    )
  }
}

ForgotPasswordPage.propTypes = {
  resetPasswordRequest: PropTypes.func.isRequired,
}

export default connect(
  null,
  { resetPasswordRequest },
)(ForgotPasswordPage)
