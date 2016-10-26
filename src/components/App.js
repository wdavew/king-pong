import React, { Component } from 'react';
import Leaderboard from './Leaderboard.js';
import LeagueList from './LeagueList.js';
import Login from './Login.js';
import Signup from './Signup.js';
import LeagueForm from './LeagueForm.js';

import { Router, Route, Link, browserHistory } from 'react-router'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      newUser: '',
      newPassword: '',
      newLeague: '',
      leagues: [],
      activeLeague: '',
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.enterLeague = this.enterLeague.bind(this);
    this.postUserData = this.postUserData.bind(this);
    this.postLeagueData = this.postLeagueData.bind(this);
  }

  syncLeagues() {
    fetch('/data/getAllLeagues/leagues', { method: 'get' })
      .then(response => response.json())
      .then((jsonLeagueData) => {
        this.setState({
          allLeagues: jsonLeagueData,
        })
      })
  }

  componentDidMount() {
    console.log('app has mounted and is requesting available leagues');
    this.syncLeagues();
  }
  handleInputTextChange(event, stateKey) {
    const newState = {};
    newState[stateKey] = event.target.value;
    this.setState(newState);
  }

  enterLeague(league) {
    this.setState({
      activeLeague: league,
      isLoggedIn: true,
    });
  }

  postUserData(e) {
    e.preventDefault();
    const {newUser, newPassword} = this.state;
    fetch('/data/createNewUser/newUser', {
      method: 'POST',
      body: JSON.stringify({ username: newUser, password: newPassword }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  postLeagueData(e) {
    console.log("posting league data");
    e.preventDefault();
    fetch('/data/createNewLeague/newLeague', {
      method: 'POST',
      body: JSON.stringify({ league: this.state.newLeague }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() => this.syncLeagues());
  }


  handleLoginSubmit(e) {
    e.preventDefault();
    fetch(`/data/userLeagues/${this.state.username}`, { method: 'get' })
      .then(response => response.json())
      .then((jsonData) => {
        const leagues = jsonData.map(obj => obj.league);
        this.setState({
          leagues: leagues,
          isLoggedIn: true
        })
      })
  }

  render() {
    const leagues = !this.state.activeLeague && this.state.isLoggedIn ?
      <LeagueList leagues={this.state.leagues} enterLeague={this.enterLeague} />
      : null;
    const leaderboard = this.state.activeLeague ?
      <Leaderboard league={this.state.activeLeague} username={this.state.username} />
      : null;
    const login = !this.state.isLoggedIn ?
      <Login submitLogin={this.handleLoginSubmit} handleInputTextChange={(e) => this.handleInputTextChange(e, 'username')} />
      : null;
    const signup = !this.state.isLoggedIn ?
      <Signup submit={this.postUserData} handleInputTextChange={this.handleInputTextChange} />
      : null;
    const leagueForm = this.state.isLoggedIn ?
      <LeagueForm chooseLeague={this.postLeagueData} submit={this.postLeagueData}
        leagues={this.state.allLeagues} handleInputTextChange={this.handleInputTextChange} />
      : null;
    return (
      <div>
        {login}
        {leagues}
        {signup}
        {leagueForm}
        {leaderboard}
      </div>
    )
  }
};

export default App;