import React from "react"
import { Link } from "react-router-dom"
import { Container, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import * as actions from "../store/actions/auth"

const HomePage = function ({ isAuthenticated, logout }) {
  return (
    <div className="HomePage">
      <Container>
        <h1>Home Page</h1>
        {isAuthenticated ? (
          // <button onClick={() => logout()}>Log Out</button>
          <Button primary onClick={() => logout()}>
            Log Out
          </Button>
        ) : (
          <div>
            <Link to="/login">Log in</Link>
            {" or "}
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </Container>
    </div>
  )
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  isAuthenticated: state.user.token !== undefined,
})

export default connect(
  mapStateToProps,
  { logout: actions.logout },
)(HomePage)
