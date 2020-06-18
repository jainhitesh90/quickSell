import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminHomePage from "./pages/admin-home-page";
import UserHomePage from "./pages/user-home-page";
import InvalidRoute from './pages/invalid-route';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route path="/admin/" exact component={AdminHomePage} />
            <Route path="/" exact component={UserHomePage} />
            <Route component={InvalidRoute} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;