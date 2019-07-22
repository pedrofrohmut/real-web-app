import React from "react"
import {
  BrowserRouter, Route, Switch, NavLink,
} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import SignupPage from "./pages/SignupPage"
import ConfirmationPage from "./pages/ConfirmationPage"
import UserRoute from "./components/routes/UserRoute"
import GuestRoute from "./components/routes/GuestRoute"

const App = () => (
  <BrowserRouter>
    <ul>
      <li>
        <NavLink exact to="/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/signup">
          Sign Up
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/dashboard">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
    </ul>

    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/confirmation/:token" component={ConfirmationPage} />
      <GuestRoute exact path="/login" component={LoginPage} />
      <GuestRoute exact path="/signup" component={SignupPage} />
      <UserRoute exact path="/dashboard" component={DashboardPage} />
    </Switch>
  </BrowserRouter>
)

export default App
