import React, { Component } from 'react';

function UserCard({id, username, elo, games, league, img}) {
  return (
    <div className='user-card'>
      <p> {username} </p>
      <p> Elo: {elo} </p>
    </div>
  )
}

export default UserCard;