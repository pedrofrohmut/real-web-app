import React from "react"
import { Link } from "react-router-dom"

const HomePage = () => (
  <div className="HomePage">
    <h1>Home Page</h1>
    <Link to="/login">Log in</Link>
  </div>
)

export default HomePage
