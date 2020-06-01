import {render} from "react-dom"
import React from "react"
import App from "./containers/App"
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import {rootReducer} from "./store/reducers/rootReducer";
import thunk from "redux-thunk";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


const app = (
    <Provider store={store}>
        <App/>
    </Provider>
)

render(app, document.getElementById("root"))