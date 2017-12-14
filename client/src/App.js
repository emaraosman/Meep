import React, { Component } from 'react';

import './App.css';

import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Auth from './modules/Auth';
import Nav from './components/Nav';
import Home from './components/Home';


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">

        <Home />

      </div>
      </Router>
    );
  }
}

export default App;
