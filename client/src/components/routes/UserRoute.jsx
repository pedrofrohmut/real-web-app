import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Route, Redirect } from "react-router-dom"

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return <Component {...props} />
      } else {
        return <Redirect to="/" />
      }
    }}
  />
)

UserRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  /* eslint-disable-next-line */
  component: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.email !== undefined,
})

export default connect(mapStateToProps)(UserRoute)
