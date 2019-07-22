import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import SignupForm from "../components/forms/SignupForm"
import * as actions from "../store/actions/user"
import { Container } from "semantic-ui-react"

class SignupPage extends React.Component {
  handleSubmit = data =>
    this.props.signup(data).then(() => this.props.history.push("/dashboard"))

  render() {
    return (
      <div className="SignupPage">
        <Container>
          <h1>SignUp</h1>
          <SignupForm onSubmit={this.handleSubmit} />
        </Container>
      </div>
    )
  }
}

SignupPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  signup: PropTypes.func.isRequired,
}

export default connect(
  null,
  { signup: actions.signup },
)(SignupPage)
