import React, { Component } from 'react';

function Form(props) {
  return (
    <div>
      <form onSubmit={props.handleSubmit} type='submit'>
        <input type='text' placeholder='Username' onChange={props.handleUserChange} />
        <input type='text' placeholder='Password' onChange={props.handlePasswordChange} />
        <input type="submit" style={{display: 'none'}}/>
      </form>
    </div>
  )

}

export default Form;