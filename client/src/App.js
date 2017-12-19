import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Auth from './modules/Auth';
import Nav from './components/Nav';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import ProfileSingle from './components/ProfileSingle'
import ProfileEdit from './components/ProfileEdit'



class App extends Component {
  constructor(){
    super()
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      id: null,
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
      //profile Data:
      userData: '',
      userDataLoaded: false,
      profileData: null,
      profileDataLoaded: false,
      //component displayed
      dashboard: 'home',
    }

    this.resetFireRedirect = this.resetFireRedirect.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.getUserData = this.getUserData.bind(this);
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

  getUserData() {
      this.resetFireRedirect()
      fetch(`/profiles/${this.state.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${Auth.getToken()}`,
          token: `${Auth.getToken()}`,
        }
      }).then(res => res.json())
      .then(res => {
        console.log("the res bro: ",res)
        this.setState({
          userData: res.username,
          userDataLoaded: true,
          profileData: res.profile,
          profileDataLoaded: true,
          dashboard: 'single',
        })
      })
    }

// +++++++++++++++++++++++++++++++++++++

  handleLoginSubmit(e) {
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
      }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.token) {
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            loginUserName: '',
            loginUserPassword: '',
            id: res.id,

          })
          this.getUserData()
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
        e.preventDefault();
        const newUser = {
          username: this.state.registerUserName,
          password: this.state.registerPassword,
          email: this.state.registerEmail,
          name: this.state.registerName,
        };
        console.log(newUser);
        fetch('/users', {
          method: 'POST',
          body: JSON.stringify({
            user: newUser,
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
              dashboard: 'edit'
            })
          }
        }).catch(err => {
          console.log(err);
        })
      }
    // -------------------------------------
    // +++++++++++++++++++++++++++++++++++++
    handleProfileEdit(e) {
          const Auth = this.props.auth
        e.preventDefault();
        fetch('/users', {
          method: 'POST',
          body: JSON.stringify({
            profiles: {
              facebookURL: this.state.facebookURL,
              instagramURL: this.state.twitterURL,
              twitterURL: this.state.twitterURL,
              googleURL: this.state.googleURL,
              linkedinURL: this.state.linkedinURL,
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
      loginPassword: '',
    })
  })
}




  render() {

    return (
      <Router>
      <div className="App">
        <Nav
          logoutUser={this.logoutUser}
          handleLoginSubmit = {this.handleLoginSubmit}
          handleInputChange ={this.handleInputChange}
          auth={this.state.auth}
          shouldFireRedirect={this.state.shouldFireRedirect}
          //Login Form States:
          loginUserName={this.state.loginUserName}
          loginPassword={this.state.loginPassword}
        />

      <Route exact path='/' render={() =>
        <Home
          auth={this.state.auth}
          shouldFireRedirect={this.state.shouldFireRedirect}
          //Login Form States:
          handleRegisterSubmit={this.handleRegisterSubmit}
          loginUserName={this.state.loginUserName}
          loginPassword={this.state.loginPassword}
          handleInputChange={this.handleInputChange}
          //Register Form states:
          registerUserName={this.state.registerUserName}
          registerEmail={this.state.registerEmail}
          registerName={this.state.registerName}
          registerPassword={this.state.registerPassword}
          />
        }
        />


      <Route exact path={`/profile`} render={() =>
        this.state.profileDataLoaded ? (
          <ProfileSingle
            handleInputChange={this.handleInputChange}
            userData={this.state.userData}
            userDataLoaded={this.state.userDataLoaded}
            profileData={this.state.profileData}
            profileDataLoaded={this.state.profileDataLoaded}
          />
        ):(
          <p>Loading...</p>
        )}
      />


      <Route exact path={`/profile/edit`} render={() =>
        this.state.profileDataLoaded ? (
          <ProfileEdit
            handleInputChange={this.handleInputChange}
            userData={this.state.userData}
            userDataLoaded={this.state.userDataLoaded}
            profileData={this.state.profileData}
            profileDataLoaded={this.state.profileDataLoaded}
            facebookURL={this.state.facebookURL}
            instagramURL={this.state.instagramURL}
            twitterURL={this.state.twitterURL}
            googleURL={this.state.googleURL}
            linkedinURL={this.state.linkedinURL}
          />
        ):(
          <p>Loading...</p>
        )}
      />



      </div>
      </Router>

    )//end of return
  } //End of render

} //END OF CLASS

export default App;
