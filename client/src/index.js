import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { setAuthorizationHeaders } from "./utils/authorizationHeaders"

import { addLocaleData } from "react-intl"
import en from "react-intl/locale-data/en"
import pt from "react-intl/locale-data/pt"

import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducer from "./store/rootReducer"
import { userFetched, fetchCurrentUser } from "./store/actions/user"
import { localeSet } from "./store/actions/locale"
import createSagaMiddleware from "redux-saga"
import rootSaga from "./store/rootSaga"

import "semantic-ui-css/semantic.min.css"
import "./index.css"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)),
)

sagaMiddleware.run(rootSaga)

if (localStorage.wormbooksJWT) {
  setAuthorizationHeaders(localStorage.wormbooksJWT)
  store.dispatch(fetchCurrentUser())
} else {
  store.dispatch(userFetched({}))
}

if (localStorage.getItem("alhubLang")) {
  store.dispatch(localeSet(localStorage.getItem("alhubLang")))
}

addLocaleData(en)
addLocaleData(pt)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
)
