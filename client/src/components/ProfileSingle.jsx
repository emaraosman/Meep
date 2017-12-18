import React from 'react';

function ProfileSingle (props) {


  return (
    <div>
      <h3>{props.profile.name}</h3>
      <p>{props.profile.description}</p>
      {(props.profile.username) ? <p className="user">{props.profile.username}</p> : '' }
    </div>
  )//end of return

}

export default Profile;
