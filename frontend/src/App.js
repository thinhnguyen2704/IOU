import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Leaderboard from "./containers/Leaderboard";
import Home from "./containers/Home";
import NotFound from './containers/NotFound'

//import contexts
import { UserProvider } from "./hoc/UserContext";

function App() {
  return (
    <div className="app">
      {/* Pass user's data to app components */}
      <UserProvider>
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
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
