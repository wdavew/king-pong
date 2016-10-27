import React, { Component } from 'react';
import Form from './Form.js';

function Login(props) {
  return (
    <div className='login-form'>
      <div id='title-div' className='container-fluid'>
        <h3 className='main-title'>King Pong</h3>
      </div>
      <h4>Login</h4>
      <Form handleSubmit={props.submitLogin} handleUserChange={props.handleInputTextChange} />
    </div>
  )
}

export default Login;