import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/home-page.js";
import ErrorComponent from './components/error-component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route component={ErrorComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;