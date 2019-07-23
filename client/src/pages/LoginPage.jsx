import React from "react"
import { Container } from "semantic-ui-react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import LoginForm from "../components/forms/LoginForm"
import * as actions from "../store/actions/auth"
import PropTypes from "prop-types"

const LoginPage = ({ login, history }) => {
  const handleSubmit = ({ email, password }) =>
    login({ email, password }).then(() => history.push("/dashboard"))

  return (
    <div className="LoginPage">
      <Container>
        <h1>Login</h1>
        <LoginForm onSubmit={handleSubmit} />
        <Link to="/forgot_password">Forgot Password</Link>
      </Container>
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  undefined,
  { login: actions.login },
)(LoginPage)
