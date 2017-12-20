import React from 'react';

function Nav (props) {



  return (
    <div className="nav">
      nav bar

      { !props.auth && (

        <form onSubmit={props.handleLoginSubmit}>
          <input className="simple-form" type="text" name="loginUserName" value={props.loginUserName}
            onChange={props.handleInputChange} placeholder="Username"
          />
          <input className="simple-form" type="password" name="loginPassword" value={props.loginUserPassword}
            onChange={props.handleInputChange} placeholder="Password"
          />
          <input className="input-button" type="submit" />
        </form>

      )}

      <button className="logout" onClick={props.logoutUser}>Log Out</button>

    </div>
  )
}

export default Nav;
