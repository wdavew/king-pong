import React, { Component } from 'react';
import Form from './Form.js'

function Signup(props) {
  return (
    <div className='signup'>
    <p>Signup</p>
    <Form handleSubmit={props.submit} handleUserChange={(e) => props.handleInputTextChange(e, 'newUser')}
    handlePasswordChange={(e) => props.handleInputTextChange(e, 'newPassword')}/>
    </div>
  )
}

export default Signup;