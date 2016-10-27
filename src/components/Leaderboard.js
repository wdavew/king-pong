import React, { Component } from 'react';
import UserCard from './UserCard.js';
import ClickableButton from './ClickableButton.js';
import RecordMenu from './ClickableButton.js';
import FlipMove from 'react-flip-move';

import Message from './Message.js';
const Elo = require('arpad');
const socket = io.connect('http://localhost:3000/')

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
    this.gatherMessages = this.gatherMessages.bind(this);
    this.syncData = this.syncData.bind(this);
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
      .then(response => response.text())
      .then((response) => {
        console.log('client socket emitting');
        socket.emit('reloadUserRequest');
      })
  }

  deleteMsg(id) {
    console.log('deleting msg');
    console.log(id);
    fetch(`/data/messages/delete/${id}`, { method: 'delete' })
      .then(() => this.gatherMessages());
  };


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
    }).then((response) => {
      console.log('client socket emitting');
      socket.emit('messageSent');
    })
  }

  syncData() {
    console.log('syncing user data')
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
    socket.on('reloadUsers', () => {
      console.log('reloading users')
      this.syncData()
    });
    socket.on('updateMessages', () => {
      console.log('reloading messages')
      this.gatherMessages()
    });
    this.syncData().then(() => this.gatherMessages());
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <li key={`${user.username}`} id={`user${index}`}>
          <UserCard league={user.league}
            username={user.username} elo={user.elo} games={user.games} img={user.img}
            handleWinClick={this.requestEloUpdate} ranking={index + 1} />
        </li>
      )
    });

    const messages = this.state.messages.map((msg, index) => {
      console.log('messageId', msg.id)
      return (
        <li className='msg' key={msg.id} >
          <Message action={msg.action} key={msg.id} sender={msg.sender} msgId={msg.id} time={msg.createdAt}
            updateElo={this.updateElo} deleteMsg={this.deleteMsg.bind(this, msg.id)} />
        </li>
      )
    });

    return (
      <div className='container leaderboard'>
        <div>
          <h1 className='title'>{`${this.state.league} Standings`}</h1>
        <p className='subtitle'>{`You are logged in as ${this.state.username}`}</p>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12 col-md-6'>
            <FlipMove typeName='ul' duration='350' enterAnimation='fade'>
              {users}
            </FlipMove>
          </div>
          <div className='col-xs-12 col-md-6'>
            <FlipMove typeName='ul' duration='200' enterAnimation='fade' leaveAnimation='accordionVertical'>
              {messages}
            </FlipMove>
          </div>
        </div>
      </div>
      </div >
    )
  }
}

export default Leaderboard;