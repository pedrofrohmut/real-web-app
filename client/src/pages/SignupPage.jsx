import React from "react"
import SignupForm from "../components/forms/SignupForm"
import { Container } from "semantic-ui-react"

const SignupPage = () => (
  <div className="SignupPage">
    <Container>
      <h1>SignUp</h1>
      <SignupForm />
    </Container>
  </div>
)

export default SignupPage
