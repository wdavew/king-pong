import React, { Component } from 'react';

function ClickableButton(props) {
  return (
    <button onClick={props.handleClick}>{props.displayText} </button>
  )
}

export default ClickableButton;