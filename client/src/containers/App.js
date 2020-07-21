import React from "react";
import SocialLogin from "./SocialLogin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
// import GoalSet from './GoalSet';
import "antd/dist/antd.css";

const App = () => {

  const loginUser = useSelector((state) => state.login, []);

  return (
    <Router>
      <Route
        exact
        path="/"
        render={() =>
          loginUser.isLoggedIn ? (
            <Redirect
              path="/"
              to={{
                pathname: "/GoalSet",
                state: loginUser,
              }}
            />
          ) : (
            <SocialLogin />
          )
        }
      />
      {/* <Route path="/GoalSet" component={GoalSet} /> */}
    </Router>
  );
};

export default App;
