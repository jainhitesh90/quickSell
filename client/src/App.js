import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminHomePage from "./pages/admin-home-page";
import UserHomePage from "./pages/user-home-page";
import ErrorComponent from './components/error-component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/admin/" exact component={AdminHomePage} />
            <Route path="/user/" exact component={UserHomePage} />
            <Route component={ErrorComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;