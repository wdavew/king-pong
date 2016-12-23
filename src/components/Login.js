import React, { Component } from 'react';
import { updateNameInput, updatePassInput, loginUser, logoutRequest } from '../actions/authActions.js';
import { connect } from 'react-redux';

import Form from './Form.js';

const mapStateToProps = (state) => ({
  user: state.login.user,
  usernameInput: state.login.usernameInput,
  passwordInput: state.login.passwordInput
})

const mapDispatchToProps = {
  handleUsernameChange: updateNameInput,
  handlePasswordChange: updatePassInput,
  handleLoginSubmit: loginUser,
  handleLogoutRequest: logoutRequest
}

function Login(props) {
  const creds = { username: props.usernameInput, password: props.passwordInput };
  return (
    <div className='login-form'>
      <div id='title-div' className='container-fluid'>
        <h3 className='main-title'>King Pong</h3>
      </div>
      <h4>Login</h4>
      <Form handleSubmit={() => props.handleLoginSubmit(creds)} 
      handleUserChange={(e) => props.handleUsernameChange(e.target.value)}
      handlePasswordChange={(e) => props.handlePasswordChange(e.target.value)} />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);