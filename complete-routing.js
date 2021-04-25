import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Prompt,
} from "react-router-dom";

const User = (params) => {
  return <h1>I am user boss! {params.username}</h1>;
};

export class CompleteRouting extends Component {
  state = {
    loggedIn: false,
  };
  loginHandler = () => {
    this.setState((prevState) => ({
      loggedIn: !prevState.loggedIn,
    }));
  };
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/home" exact activeStyle={{ color: "green" }}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/pp" exact activeStyle={{ color: "green" }}>
                User
              </NavLink>
            </li>
          </ul>

          <Prompt
            when={!this.state.loggedIn}
            message={(location) => {
              return location.pathname.startsWith("/user")
                ? "Are you sure?"
                : true;
            }} /* message="Are you sure" */
          />

          <input
            type="button"
            value={this.state.loggedIn ? "LOGIN" : "LOGOUT"}
            onClick={this.loginHandler.bind(this)}
          />
          <Route
            path="/home"
            exact
            strict
            render={() => {
              return <h1>Welcome Home</h1>;
            }}
          ></Route>
          <Route
            path="/user/:username"
            exact
            strict
            render={({ match }) =>
              this.state.loggedIn ? (
                <User username={match.params.username} />
              ) : (
                <Redirect to="/home" />
              )
            }
          ></Route>
        </div>
      </Router>
    );
  }
}

export default CompleteRouting;
