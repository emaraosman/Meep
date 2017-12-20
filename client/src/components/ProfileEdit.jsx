import React from 'react';

function ProfileEdit (props) {

  props.resetFireRedirect()

  return (
    <div className="profile-form">
      <form onSubmit={props.handleEditUser}>
        <input
          type="text"
          name="facebookURL"
          value={props.facebookURL}
          onChange={props.handleInputChange}
          placeholder="Facebook URL"
        />
        <br />
        <input
          type="text"
          name="instagramURL"
          value={props.instagramURL}
          onChange={props.handleInputChange}
          placeholder="Instagram URL"
        />
        <br />
        <input
          type="text"
          name="twitterURL"
          value={props.twitterURL}
          onChange={props.handleInputChange}
          placeholder="Twitter URL"
        />
        <br />
        <input
          type="text"
          name="googleURL"
          value={props.googleURL}
          onChange={props.handleInputChange}
          placeholder="Google+ URL"
        />
        <br />
        <input
          type="text"
          name="linkedinURL"
          value={props.linkedinURL}
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
