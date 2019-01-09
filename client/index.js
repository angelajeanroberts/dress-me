import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./app";

//drizzle functions and Main contract artificate
import { Drizzle, generateStore } from "drizzle";
import Main from "../truffle/build/contracts/Main.json";

const options = { contracts: [Main] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App drizzle={drizzle} />
    </Router>
  </Provider>,
  document.getElementById("app")
);
