import React, { Component } from 'react';
import UserCard from './UserCard.js';
import ClickableButton from './ClickableButton.js';
import RecordMenu from './ClickableButton.js';
const Elo = require('arpad');


class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      league: '',
      recordMenuOn: false,
    };
    this.showRecordMenu = this.showRecordMenu.bind(this);
    this.updateElo = this.updateElo.bind(this);
  }

  showRecordMenu() {
    console.log('showing record menu');
  }

  updateElo(user, targetUser) {
    console.log(`updating elo for ${user} and ${targetUser}`);
    fetch(`/data/${this.state.league}/${user}/${targetUser}`, { method: 'get' })
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
          league: 'Westeros',
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
        <h1>"Ping Pong Standings"</h1>
        <ul>
          {users}
        </ul>
      </div>
    )
  }
}

export default Leaderboard;