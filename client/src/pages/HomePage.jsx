import React from "react"
import { Link } from "react-router-dom"
import { Container } from "semantic-ui-react"

const HomePage = () => (
  <div className="HomePage">
    <Container>
      <h1>Home Page</h1>
      <Link to="/login">Log in</Link>
    </Container>
  </div>
)

export default HomePage
