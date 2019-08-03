import React from "react"
import ReactDOM from "react-dom"
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import "semantic-ui-css/semantic.min.css"
import "./index.css"
import App from "./App"
import rootReducer from "./store/rootReducer"
import { userFetched, fetchCurrentUser } from "./store/actions/user"
import { setAuthorizationHeaders } from "./utils/authorizationHeaders"

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

if (localStorage.wormbooksJWT) {
  setAuthorizationHeaders(localStorage.wormbooksJWT)
  store.dispatch(fetchCurrentUser())
} else {
  store.dispatch(userFetched({}))
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)
