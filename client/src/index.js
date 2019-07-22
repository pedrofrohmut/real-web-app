import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import decode from "jwt-decode"
import "semantic-ui-css/semantic.min.css"
import "./index.css"
import App from "./App"
import rootReducer from "./store/rootReducer"
import { userLoggedIn } from "./store/actions/auth"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

if (localStorage.wormbooksJWT) {
  const payload = decode(localStorage.wormbooksJWT)
  // console.log("PAYLOAD", payload)
  store.dispatch(
    userLoggedIn({
      token: localStorage.wormbooksJWT,
      email: payload.email,
      isConfirmed: payload.isConfirmed,
    }),
  )
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)
