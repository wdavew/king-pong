import React, { Component } from 'react';
import ClickableButton from './ClickableButton.js';

function UserCard({id, username, ranking, elo, games, league, img, handleWinClick}) {
  return (
    <div className='user-card'>
      <p> <span className='rank-num'>{`${ranking}. `}</span> {username} </p>
      <p> Elo: {elo} </p>
      <ClickableButton handleClick={() => handleWinClick("Ned_Stark", username)} displayText={'I just beat this person'} />

    </div>
  )
}

export default UserCard;