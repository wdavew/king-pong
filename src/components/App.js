import React, { Component } from 'react';
import Leaderboard from './Leaderboard.js';
import LeagueList from './LeagueList.js';
import Login from './Login.js';
import { Router, Route, Link, browserHistory } from 'react-router'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      leagues: [],
      activeLeague: '',
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.enterLeague = this.enterLeague.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ username: event.target.value });
  }

  enterLeague(league) {
    this.setState({
      activeLeague: league,
      isLoggedIn: true,
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    fetch(`/data/userLeagues/${this.state.username}`, { method: 'get' })
      .then(response => response.json())
      .then((jsonData) => {
        const leagues = jsonData.map(obj => obj.league);
        this.setState({ leagues: leagues })
      })
  }

  render() {
    const leagues = this.state.leagues.length && !this.state.isLoggedIn ? 
    <LeagueList leagues={this.state.leagues} enterLeague = {this.enterLeague}/> 
    : null;
    const leaderboard = this.state.activeLeague ? 
    <Leaderboard league={this.state.activeLeague} username={this.state.username}/> 
    : null;
    const login = !this.state.activeLeague ? 
    <Login submitLogin={this.handleLoginSubmit} handleUserNameChange={this.handleUserNameChange}/> 
    : null;

    return (
      <div>
        {login}
        {leagues}
        {leaderboard}
      </div>
    )
  }
};

export default App;