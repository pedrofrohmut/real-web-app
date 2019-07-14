import React from "react"
import { Container } from "semantic-ui-react"
import LoginForm from "../components/forms/LoginForm"

const LoginPage = () => {
  const handleSubmit = ({ email, password }) => {
    console.log(email, password)
  }

  return (
    <div className="LoginPage">
      <Container>
        <h1>Log in Page</h1>
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </div>
  )
}
export default LoginPage
