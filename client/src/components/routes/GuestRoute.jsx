import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isAuthenticated) {
        return <Component {...props} />
      } else {
        return <Redirect to="/dashboard" />
      }
    }}
  />
)

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.token !== undefined,
})

export default connect(mapStateToProps)(UserRoute)
