import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import Loader from "react-loader"
import { IntlProvider } from "react-intl"
import messages from "./utils/messages"

import { connect } from "react-redux"
import * as actions from "./store/actions/user"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import SignupPage from "./pages/SignupPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import CharactersPage from "./pages/CharactersPage"
import NewCharacterPage from "./pages/NewCharacterPage"

import UserRoute from "./components/routes/UserRoute"
import GuestRoute from "./components/routes/GuestRoute"
import Navbar from "./components/navigation/Navbar"

const App = ({
  isAuthenticated, isLoading, lang, fetchCurrentUser,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentUser()
    }
  }, [fetchCurrentUser, isAuthenticated])

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
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
            <UserRoute exact path="/characters" component={CharactersPage} />
            <UserRoute
              exact
              path="/characters/new"
              component={NewCharacterPage}
            />
          </Switch>
        </Loader>
      </BrowserRouter>
    </IntlProvider>
  )
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.email !== undefined,
  isLoading: state.user.isLoading,
  lang: state.locale.lang,
})

export default connect(
  mapStateToProps,
  { fetchCurrentUser: actions.fetchCurrentUser },
)(App)
