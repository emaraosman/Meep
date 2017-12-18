import React, { Component } from 'react';

import './App.css';

import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Auth from './modules/Auth';
import Nav from './components/Nav';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import ProfileSingle from './components/ProfileSingle'

class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      //Login Form States:
      loginUserName: '',
      loginPassword: '',
      //Register Form states:
      registerUserName: '',
      registerEmail: '',
      registerName: '',
      registerPassword: '',
      //Social Media Form states:
      facebookURL: '',
      instagramURL: '',
      twitterURL: '',
      googleURL: '',
      linkedinURL: '',
    }

    this.resetFireRedirect = this.resetFireRedirect.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);

  }

handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  resetFireRedirect() {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      })
    }
  }


// +++++++++++++++++++++++++++++++++++++
  handleLoginSubmit(e) {
      const Auth = this.props.auth
      e.preventDefault();
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.loginUserName,
          password: this.state.loginPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res => res.json()) //ICHANGED THIS TO res.BODY AHHH ????
      .then(res => {
        console.log(res);
        if (res.token) {
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            loginUserName: '',
            loginUserPassword: '',
          })
        }
        else{
          alert("login failed")
        }
      }).catch(err => {
        console.log(err);
      })
    }
    // -------------------------------------

    // +++++++++++++++++++++++++++++++++++++
    handleRegisterSubmit(e) {
          const Auth = this.props.auth
        e.preventDefault();
        fetch('/users', {
          method: 'POST',
          body: JSON.stringify({
            user: {
              username: this.state.registerUserName,
              password: this.state.registerPassword,
              email: this.state.registerEmail,
              name: this.state.registerName,
            }
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        }).then(res => res.json())
        .then(res => {
          if (res.token) {
            Auth.authenticateToken(res.token);
            this.setState({
              auth: Auth.isUserAuthenticated(),
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }
    // -------------------------------------

  logoutUser() {
  fetch('/logout', {
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${Auth.getToken()}`,
      token: Auth.getToken(),
    }
  }).then(res => {
    Auth.deauthenticateUser();
    this.setState({
      auth: Auth.isUserAuthenticated(),
      loginUserName: '',
      loginUserPassword: '',
    })
  })
}




  render() {

    return (
      <Router>
      <div className="App">
        <Nav
          handleLoginSubmit = {this.handleLoginSubmit}
          handleInputChange ={this.handleInputChange}
          auth={this.state.auth}
          shouldFireRedirect={this.state.shouldFireRedirect}
          //Login Form States:
          loginUserName={this.state.loginUserName}
          loginPassword={this.state.loginPassword}/>
        <Home
          auth={this.state.auth}
          shouldFireRedirect={this.state.shouldFireRedirect}
          //Login Form States:
          handleRegisterSubmit={this.handleRegisterSubmit}
          loginUserName={this.state.loginUserName}
          loginPassword={this.state.loginPassword}
          //Register Form states:
          registerUserName={this.state.registerUserName}
          registerEmail={this.state.registerEmail}
          registerName={this.state.registerName}
          registerPassword={this.state.registerPassword}
        />

      </div>
      <Route
        exact
        path="/register"
        render={() =>
          !this.state.auth ? (
            <ProfileSingle
              auth={this.state.auth}
              registerUserName={this.state.registerUsername}
              registerPassword={this.state.registerPassword}
              registerEmail={this.state.registerEmail}
              registerName={this.state.registerName}
              handleInputChange={this.handleInputChange}
              handleRegisterSubmit={this.handleRegisterSubmit}
            />
          ) : (
            <Redirect to="/home" />
          )}
        />
      </Router>
    );
  }

} //END OF CLASS

export default App;
