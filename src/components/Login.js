import React, { Component } from 'react';
import Form from './Form.js';

function Login(props) {
  return (
    <div className='login'>
    <Form handleSubmit={props.submitLogin} handleUserChange={props.handleInputTextChange}/>
    </div>
  )
}

export default Login;