import React from "react"
import { connect } from "react-redux"
import { Container, Message } from "semantic-ui-react"
import PropTypes from "prop-types"
import { validateToken, resetPassword } from "../store/actions/auth"
import ResetPasswordForm from "../components/forms/ResetPasswordForm"

class ResetPasswordPage extends React.Component {
  state = {
    isLoading: true,
    success: false,
  }

  componentDidMount() {
    this.props
      .validateToken(this.props.match.params.token)
      .then(() =>
        this.setState({
          isLoading: false,
          success: true,
        }))
      .catch(() =>
        this.setState({
          isLoading: false,
          success: false,
        }))
  }

  handleSubmit = ({ password }) => {
    const { token } = this.props.match.params
    return this.props
      .resetPassword({ password, token })
      .then(() => this.props.history.push("/login"))
  }

  render() {
    const { isLoading, success } = this.state
    const { token } = this.props.match.params

    return (
      <Container className="ResetPasswordPage">
        {isLoading && <Message content="Loading..." />}

        {!isLoading && success && (
          <ResetPasswordForm onSubmit={this.handleSubmit} token={token} />
        )}

        {!isLoading && !success && <Message negative content="Invalid Token" />}
      </Container>
    )
  }
}

ResetPasswordPage.propTypes = {
  validateToken: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(
  null,
  { validateToken, resetPassword },
)(ResetPasswordPage)
