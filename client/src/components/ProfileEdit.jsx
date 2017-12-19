import React from 'react';

function ProfileEdit (props) {
  return (
    <div className="profileform">
      <form onSubmit={props.handleRegisterSubmit}>
        <input
          type="text"
          name="facebookURL"
          value={props.profileData.facebook}
          onChange={props.handleInputChange}
          placeholder="Facebook URL"
        />
        <br />
        <input
          type="text"
          name="instagramURL"
          value={props.profileData.instagram}
          onChange={props.handleInputChange}
          placeholder="Instagram URL"
        />
        <br />
        <input
          type="text"
          name="twitterURL"
          value={props.profileData.twitter}
          onChange={props.handleInputChange}
          placeholder="Twitter URL"
        />
        <br />
        <input
          type="text"
          name="googleURL"
          value={props.profileData.google}
          onChange={props.handleInputChange}
          placeholder="Google+ URL"
        />
        <br />
        <input
          type="text"
          name="linkedinURL"
          value={props.profileData.linkedinURL}
          onChange={props.handleInputChange}
          placeholder="LinkedIn URL"
        />
        <br />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default ProfileEdit;
