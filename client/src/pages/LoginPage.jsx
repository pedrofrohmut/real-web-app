import React from "react"
import { Container } from "semantic-ui-react"
import { connect } from "react-redux"
import LoginForm from "../components/forms/LoginForm"
import { login } from "../store/actions/auth"
import PropTypes from "prop-types"

const LoginPage = ({ login, history }) => {
  const handleSubmit = ({ email, password }) => login({ email, password }).then(() => history.push("/"))

  return (
    <div className="LoginPage">
      <Container>
        <h1>Log in Page</h1>
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </div>
  )
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(
  undefined,
  { login },
)(LoginPage)
