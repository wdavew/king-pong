import React, { Component } from 'react';

function Form(props) {
  const {handleSubmit, handleUserChange, handlePasswordChange} = props;
  return (
    <div className='row'>
      <form onSubmit={(e) => (e.preventDefault(), handleSubmit())} type='submit'>
        <div className='col-xs-6'>
          <input type='text' className='login-user' placeholder='Username' onChange={handleUserChange} />
        </div>
        <div className='col-xs-6'>
          <input type='text' className='login-pass' placeholder='Password' onChange={handlePasswordChange} />
        </div>
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </div>
  )
}

export default Form;