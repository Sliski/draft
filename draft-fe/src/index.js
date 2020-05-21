import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import configureSocket from "./io/socket";
import reducer from "./io/reducer";
import { Provider } from "react-redux";

const store = createStore(reducer);

// setup socket connection
export const socket = configureSocket(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
