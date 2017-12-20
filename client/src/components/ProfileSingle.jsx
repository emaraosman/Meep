import React from 'react';

function ProfileSingle (props) {

  props.resetFireRedirect()
  return (
    <div>
      <h1>Profile Page</h1>
      <h3>{props.userData.username}</h3>
      <p>{props.profileData.facebook}</p>
      <p>{props.profileData.instagram}</p>
      <p>{props.profileData.twitter}</p>
      <p>{props.profileData.linkedin}</p>
      <p>{props.profileData.google}</p>
    </div>
  )//end of return

}

export default ProfileSingle;
