import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Leaderboard from './components/Leaderboard';
import Home from './components/Home';

function App() {
  return (
    <div className="app"> 
      <Router>
      <Header />
      <div className="app__body">
        <Switch>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          {/* This is the default route */}

          <Route path="/">  
            <Home />
          </Route>
        </Switch>
      </div>
      </Router>
    </div>
  );
}

export default App;
