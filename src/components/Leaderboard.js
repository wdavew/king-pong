import React, { Component } from 'react';
import UserCard from './UserCard.js';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      league: '',
    };
  }

  componentDidMount() {
    console.log('board has mounted and is requesting league data');
    fetch('/data/Westeros', { method: 'get' })
      .then((response) => response.json())
      .then((jsonUserData) => {
        this.setState({
          league: 'Westeros',
          users: jsonUserData
        })
      })
      .then(() => console.log(this.state));
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li className='user-card' key={index} id={`user${index}`}>
          <UserCard league={user.league}
            username={user.username} elo={user.elo} games={user.games} img={user.img} />
        </li>
      )
    });

    return (
      <div>
        <h1>"Hi this is my app"</h1>
        <ul>
          {users}
        </ul>
      </div>
    )
  }
}

export default Leaderboard;