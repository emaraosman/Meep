import React from 'react';

function ProfileEdit (props) {
  return (
    <div className="profileform">
      <form onSubmit={props.handleRegisterSubmit}>
        <input
          type="text"
          name="facebookURL"
          value={props.facebookURL}
          onChange={props.handleInputChange}
          placeholder="Facebook URL"
        />
        <input
          type="text"
          name="instagramURL"
          value={props.instagramURL}
          onChange={props.handleInputChange}
          placeholder="Instagram URL"
        />
        <input
          type="text"
          name="twitterURL"
          value={props.twitterURL}
          onChange={props.handleInputChange}
          placeholder="Twitter URL"
        />
        <input
          type="text"
          name="googleURL"
          value={props.googleURL}
          onChange={props.handleInputChange}
          placeholder="Google+ URL"
        />
        <input
          type="text"
          name="linkedinURL"
          value={props.linkedinURL}
          onChange={props.handleInputChange}
          placeholder="LinkedIn URL"
        />
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default ProfileEdit;
