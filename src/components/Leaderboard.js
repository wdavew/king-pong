import React, { Component } from 'react';
import UserCard from './UserCard.js';
import ClickableButton from './ClickableButton.js';
import RecordMenu from './ClickableButton.js';
import Message from './Message.js';

const Elo = require('arpad');


class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      league: props.league,
      username: props.username,
      recordMenuOn: false,
      messages: [],
    };
    this.updateElo = this.updateElo.bind(this);
    this.requestEloUpdate = this.requestEloUpdate.bind(this);

  }

  gatherMessages() {
    console.log(`gathering messages for ${this.state.username}`);
    fetch(`/data/messages/get/${this.state.username}`, { method: 'get' })
      .then(response => response.json())
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({ messages: jsonData })
      })
  }

  updateElo(targetUser) {
    console.log(`updating elo for ${this.state.username} and ${targetUser}`);
    fetch(`/data/league/${this.state.league}/${this.state.username}/${targetUser}`, { method: 'get' })
      .then(response => response.json())
      .then((jsonData) => {
        this.syncData();
      })
  }

  deleteMsg(id) {
    console.log('deleting msg');
    fetch(`/data/messages/delete/${id}`, { method: 'delete' })
      .then(response => response.json())
      .then(this.syncData());
  }


  requestEloUpdate(targetUser) {
    console.log(`sending message to ${targetUser}`);
    fetch(`/data/messages/send`, {
      method: 'POST',
      body: JSON.stringify({
        league: this.state.league,
        sender: this.state.username,
        receiver: targetUser,
        action: 'EloUpdate',
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
  }

  syncData() {
    return fetch(`/data/league/${this.state.league}`, { method: 'get' })
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
    this.syncData().then(() => this.gatherMessages());
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li className='user-card' key={index} id={`user${index}`}>
          <UserCard league={user.league}
            username={user.username} elo={user.elo} games={user.games} img={user.img}
            handleWinClick={this.requestEloUpdate} ranking={index + 1} />
        </li>
      )
    });

    const messages = this.state.messages.map((msg, index) => {
      return (
        <li className='msg' key={msg.id} >
          <Message action={msg.action} sender={msg.sender} id={msg.id} time={msg.createdAt} 
          updateElo={this.updateElo} deleteMsg={this.deleteMsg} />
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
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
}

export default Leaderboard;