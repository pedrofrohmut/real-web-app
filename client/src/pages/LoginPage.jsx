import React from "react"
import { Container } from "semantic-ui-react"
import LoginForm from "../components/forms/LoginForm"

const LoginPage = () => (
  <div className="LoginPage">
    <Container>
      <h1>Log in Page</h1>
      <LoginForm />
    </Container>
  </div>
)

export default LoginPage
