import React from 'react';

function Nav (props) {



  return (
    <div className="nav">
      nav bar
      <form onSubmit={props.handleLoginSubmit}>
        <input className="simple-form" type="text" name="loginUserName" value={props.loginUserName}
          onChange={props.handleInputChange} placeholder="Username"
        />
        <input className="simple-form" type="password" name="loginUserPassword" value={props.loginUserPassword}
          onChange={props.handleInputChange} placeholder="Password"
        />
        <input className="input-button" type="submit" />
      </form>
    </div>
  )
}

export default Nav;
