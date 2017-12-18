import React from 'react';

function ProfileSingle (props) {


  return (
    <div>
      <h3>{props.userData.name}</h3>
      <p>{props.profileData.facebook}</p>
      {(props.profile.username) ? <p className="user">{props.profile.username}</p> : '' }
    </div>
  )//end of return

}

export default ProfileSingle;
