import React, { Component } from 'react';
import ClickableButton from './ClickableButton.js';

function RecordMenu(props) {
  return (
    <div className='record-menu'>
    <ClickableButton className='won-button' handleClick={() => {}} displayText={'I Won'}/>
    <ClickableButton className='lost-butotn'handleClick={() => {}} displayText={'I Lost'}/>
    </div>
  )
}

export default RecordMenu;