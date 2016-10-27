import React, { Component } from 'react';

function Form(props) {
  return (
    <div className='row'>
      <form onSubmit={props.handleSubmit} type='submit'>
        <div className='col-xs-6'>
          <input type='text' className='login-user' placeholder='Username' onChange={props.handleUserChange} />
        </div>
        <div className='col-xs-6'>
          <input type='text' className='login-pass' placeholder='Password' onChange={props.handlePasswordChange} />
        </div>
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  )

}

export default Form;