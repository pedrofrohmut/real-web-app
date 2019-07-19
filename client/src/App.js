import React from "react"
import {
  BrowserRouter, Route, Switch, NavLink,
} from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
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
      <GuestRoute exact path="/login" component={LoginPage} />
      <UserRoute exact path="/dashboard" component={DashboardPage} />
    </Switch>
  </BrowserRouter>
)

export default App
