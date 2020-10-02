import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Leaderboard from "./containers/Leaderboard";
import Home from "./containers/Home";
import NotFound from './containers/NotFound';
import Favors from './containers/Favors';
import Debts from './containers/Debts';

//import user context
import {useUserStatus} from './hoc/UserContext';

function App() {

  const [{user}, dispatch] = useUserStatus();

  return (
    <div className="app">
      {/* Pass user's data to app components */}
        <Router>
          <Header />
          <div className="app__body">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/leaderboard">
                <Leaderboard />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/favors">
              {user ? (
                <Favors />
              ):(
                <Login />
              )}
              </Route>
              <Route path="/debts">
              {user ? (
                <Debts />
              ):(
                <Login />
              )}
              </Route>
              <Route path="/requests">
                <Home />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
