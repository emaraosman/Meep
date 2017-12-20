import React, { Component } from 'react';

import './App.css';
import axios from 'axios';

import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import Auth from './modules/Auth';
import Nav from './components/Nav';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import ProfileSingle from './components/ProfileSingle'
import ProfileEdit from './components/ProfileEdit';
import UserProfile from './components/UserProfile';


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
      show: 'home',
    }

    this.resetFireRedirect = this.resetFireRedirect.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleEditUser=this.handleEditUser.bind(this);
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
getUserData(){
  this.props.resetFireRedirect()
  fetch('/profile/edit', {
    method: 'GET',
    headers: {
      'Authorization': `Token ${Auth.getToken()}`,
      token: `${Auth.getToken()}`,
    }
  }).then(res => {
    this.setState({
      userData: res.data.user,
      userDataLoaded: true,
    })
  })
}

// +++++++++++++++++++++++++++++++++++++
getUserProfiles(){
    this.resetFireRedirect()
    fetch(`/user/${this.props.username}`, {
      method: 'GET',
    }).then(res => res.json())
    .then(res => {
      console.log("the response: ",res)
      this.setState({
        userData: res.username,
        userDataLoaded: true,
        profileData: res.profile,
        profileDataLoaded: true,
        show: 'single',
        facebook: res.profile.facebook,
        instagramURL: res.profile.instagram,
        twitterURL: res.profile.twitter,
        googleURL: res.profile.google,
        linkedinURL: res.profile.linkedin,
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
        console.log("res from login :",res);
        if (res.token) {
          Auth.authenticateToken(res.token);
          this.setState({
            auth: Auth.isUserAuthenticated(),
            loginUserPassword: '',
            id: res.id,
            shouldFireRedirect: true,
            show: "profileEdit",
            profileDataLoaded:true,
            facebookURL: res.profile.facebook,
            instagramURL: res.profile.instagram,
            twitterURL: res.profile.twitter,
            googleURL: res.profile.google,
            linkedinURL: res.profile.linkedin,
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
              loginUserPassword: '',
              id: res.id,
              shouldFireRedirect: true,
              show: "profileEdit",
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

// -------------------------------------

handleEditUser(e){
  e.preventDefault()
  fetch(`/profiles/${this.state.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      profile: {
        facebook: this.state.facebookURL,
        instagram: this.state.twitterURL,
        twitter: this.state.twitterURL,
        google: this.state.googleURL,
        linkedin: this.state.linkedinURL,
      }
    }),
    headers: {
      'Authorization': `Token ${Auth.getToken()}`,
      token: Auth.getToken(),
      'Content-Type': 'application/json',
    }
  }).then(res => {
    console.log("from edit : ",res)
  }).catch(err => {
    console.log(err)
  })
}




  render() {
    let redirect = null;
      switch (this.state.show){
        case "profile":
          redirect = <Redirect to="/profile" /> // todo: change this redirect to username from state
          break
        case "profileEdit":
          redirect = <Redirect to="/profile/edit" />
          break
        default :
          console.log("Go kiss drake")
      }
    return (
      <Router>

      <div className="App">
        {this.state.shouldFireRedirect && redirect}
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


      <Route exact path={`/user/:username`} render={(props)=>{
          return (
            <UserProfile
              username={props.match.params.username}

            />
          )
        }}
      />
{/*
  <Route exact path={`/:username`} render={() =>
    this.state.profileDataLoaded ? (
      <ProfileSingle
        handleInputChange={this.handleInputChange}
        userData={this.state.userData}
        userDataLoaded={this.state.userDataLoaded}
        profileData={this.state.profileData}
        profileDataLoaded={this.state.profileDataLoaded}
        facebook={this.state.facebook}
        instagram={this.state.instagram}
        twitter={this.state.twitter}
        google={this.state.google}
        linkedin={this.state.linkedin}
        resetFireRedirect={this.resetFireRedirect}
      />
    ):(
      <p>Loading...</p>
    )}
  />
  */}




      <Route exact path={`/profile/edit`} render={() =>
        this.state.profileDataLoaded ? (
          <ProfileEdit
            handleEditUser={this.handleEditUser}
            resetFireRedirect={this.resetFireRedirect}
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
