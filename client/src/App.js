import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import Loader from "react-loader"

import { connect } from "react-redux"
import * as actions from "./store/actions/user"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import SignupPage from "./pages/SignupPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import NewBookPage from "./pages/NewBookPage"

import UserRoute from "./components/routes/UserRoute"
import GuestRoute from "./components/routes/GuestRoute"
import Navbar from "./components/navigation/Navbar"

const App = ({ isAuthenticated, isLoading, fetchCurrentUser }) => {
  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentUser()
    } else {
      console.log("Not Authenticated")
    }
  }, [fetchCurrentUser, isAuthenticated])

  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar />}

      <Loader loaded={!isLoading}>
        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route
            exact
            path="/confirmation/:token"
            component={ConfirmationPage}
          />

          <GuestRoute exact path="/login" component={LoginPage} />

          <GuestRoute exact path="/signup" component={SignupPage} />

          <GuestRoute
            excat
            path="/forgot_password"
            component={ForgotPasswordPage}
          />

          <GuestRoute
            exact
            path="/reset_password/:token"
            component={ResetPasswordPage}
          />

          <UserRoute exact path="/dashboard" component={DashboardPage} />

          <UserRoute exact path="/books/new" component={NewBookPage} />
        </Switch>
      </Loader>
    </BrowserRouter>
  )
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.email !== undefined,
  isLoading: state.user.isLoading,
})

export default connect(
  mapStateToProps,
  { fetchCurrentUser: actions.fetchCurrentUser },
)(App)
