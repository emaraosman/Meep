import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props){
    super(props)
    this.state={
      userDataLoaded: false,
    }

  }
  // this.props.resetFireRedirect()

  componentDidMount(){
    fetch(`/user/${this.props.username}`, {
      method: 'GET',
      headers: {
      }
    }).then(res => res.json())
    .then(res => {
      console.log("the response: ",res)
      this.setState({
        userData: res.username,
        userDataLoaded: true,
        profileData: res.profile,
        profileDataLoaded: true,
        dashboard: 'single',
        facebook: res.profile.facebook,
        instagramURL: res.profile.instagram,
        twitterURL: res.profile.twitter,
        googleURL: res.profile.google,
        linkedinURL: res.profile.linkedin,
      })
    })

  }

  render(){
    return (
      <div>
      { this.state.userDataLoaded && (
        <div>
          <h1>User Profile Page</h1>
          <h3>{this.state.userData.username}</h3>
          <p>{this.state.profileData.facebook}</p>
          <p>{this.state.profileData.instagram}</p>
          <p>{this.state.profileData.twitter}</p>
          <p>{this.state.profileData.linkedin}</p>
          <p>{this.state.profileData.google}</p>
        </div>
      )
    }
    </div>

    )//end of return
}

}

export default UserProfile;
