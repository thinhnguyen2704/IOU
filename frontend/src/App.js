import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Leaderboard from "./containers/Leaderboard";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Favors from "./containers/Favors";
import Debts from "./containers/Debts";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { useUserStatus } from "./hoc/UserContext/UserContext";
import { useLoading } from "./hoc/LoadingContext/LoadingContext";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();
  const [{ user }, dispatch] = useUserStatus();
  const [loading, setLoading] = useLoading();

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
            <Route path="/favors">{user ? <Favors /> : <Login />}</Route>
            <Route path="/debts">{user ? <Debts /> : <Login />}</Route>
            <Route path="/requests">
              <Home />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Router>
    </div>
  );
}

export default App;
