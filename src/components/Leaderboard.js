import React, { Component } from 'react';
import UserCard from './UserCard.js';
import ClickableButton from './ClickableButton.js';
import RecordMenu from './ClickableButton.js';
const Elo = require('arpad');


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      users: [],
      league: props.league,
      username: props.username,
      recordMenuOn: false,
    };
    this.showRecordMenu = this.showRecordMenu.bind(this);
    this.updateElo = this.updateElo.bind(this);
  }

  showRecordMenu() {
    console.log('showing record menu');
  }

  updateElo(targetUser) {
    console.log(`updating elo for ${this.state.username} and ${targetUser}`);
    fetch(`/data/${this.state.league}/${this.state.username}/${targetUser}`, { method: 'get' })
      .then(response => response.json())
      .then((jsonData) => {
        this.syncData();
      })
  }

  syncData() {
    fetch('/data/Westeros', { method: 'get' })
      .then(response => response.json())
      .then((jsonUserData) => {
        this.setState({
          league: this.state.league,
          users: jsonUserData
        })
      })
  }

  componentDidMount() {
    console.log('board has mounted and is requesting league data');
    this.syncData();
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li className='user-card' key={index} id={`user${index}`}>
          <UserCard league={user.league} 
            username={user.username} elo={user.elo} games={user.games} img={user.img}
            handleWinClick={this.updateElo} ranking={index + 1} />
        </li>
      )
    });

    return (
      <div>
        <h1>{`${this.state.league} Standings`}</h1>
        <h2>{`You are logged in as ${this.state.username}`}</h2>
        <ul>
          {users}
        </ul>
      </div>
    )
  }
}

export default Leaderboard;