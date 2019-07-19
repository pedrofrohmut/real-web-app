import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import UserRoute from "./components/routes/UserRoute"

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <UserRoute exact path="/dashboard" component={DashboardPage} />
    </Switch>
  </BrowserRouter>
)

export default App
