import React, { Component } from "react"
import { connect } from "react-redux"
import { Message, Icon, Container } from "semantic-ui-react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { confirm } from "../store/actions/auth"

class ConfirmationPage extends Component {
  state = {
    isLoading: true,
    success: false,
  }

  componentDidMount() {
    this.props
      .confirm(this.props.match.params.token)
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

  render() {
    const { isLoading, success } = this.state

    return (
      <Container className="ConfirmationPage">
        {isLoading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your e-mail.</Message.Header>
          </Message>
        )}

        {!isLoading && success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Thank you. Your account has been verified.
              </Message.Header>
              <Link to="/dashboard">Go to your dashboard.</Link>
            </Message.Content>
          </Message>
        )}

        {!isLoading && !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>
                Sorry, An error has occured during validation.
              </Message.Header>
              This user has already been verified. Or this token is not valid
              any more.
            </Message.Content>
          </Message>
        )}
      </Container>
    )
  }
}

ConfirmationPage.propTypes = {
  confirm: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default connect(
  null,
  {
    confirm,
  },
)(ConfirmationPage)
