import React, { Component } from 'react';
import ClickableButton from './ClickableButton.js';

class UserCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='card-list user-card'>
        <p> <span className='rank-num'>{`${this.props.ranking}. `}</span><span className='user-name'> {this.props.username} </span></p>
        <p> Elo: {this.props.elo} </p>
        <ClickableButton handleClick={() => this.props.handleWinClick(this.props.username)}
          displayText={'I just beat this person'} />
      </div>
    )
  }
}

export default UserCard;