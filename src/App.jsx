import React, { Component } from "react";
import Router from "./Router.jsx";
import "./assets/css/common.scss";
import store from "./redux/store.jsx";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
export default App;
