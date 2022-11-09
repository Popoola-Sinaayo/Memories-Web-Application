import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { reducers } from "./reducers";
import App from "./App";
import Main from "./Main";
import "./index.css";
import store from './redux/store'


ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("root")
);
