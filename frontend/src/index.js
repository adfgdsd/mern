import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import AlertTemplate from "react-alert-template-basic";
import { positions, Transitions, Provider as AlertProvider, transitions } from "react-alert";

const Option = {
  Timeout: 5000,
  positions:positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}


ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...Option}> 
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
