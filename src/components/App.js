import React, { Component } from 'react';
import Leaderboard from './Leaderboard.js';
import LeagueList from './LeagueList.js';
import Login from './Login.js';
import Signup from './Signup.js';
import LeagueForm from './LeagueForm.js';
import { Router, Route, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { fetchLeagues } from '../actions/leagueActions.js';
require('../static/mainstyle.css');

const mapStateProps = (state) => (
  { allLeagues: state.leagues }
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      newUser: '',
      newPassword: '',
      newLeague: '',
      leagues: [],
      activeLeague: '',
      selectedLeague: '',
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.enterLeague = this.enterLeague.bind(this);
    this.postUserData = this.postUserData.bind(this);
    this.postLeagueData = this.postLeagueData.bind(this);
    this.joinLeague = this.joinLeague.bind(this);
  }

  syncLeagues() {
    this.props.dispatch(fetchLeagues());
  }

  componentDidMount() {
    console.log('app has mounted and is requesting available leagues');
    this.syncLeagues();
  }
  
  handleInputTextChange(event, stateKey) {
    console.log(this.state.selectedLeague);
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

  joinLeague(e) {
    e.preventDefault();
    fetch('/data/leagues/join', {
      method: 'POST',
      body: JSON.stringify({ username: this.state.username, league: this.state.selectedLeague }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(() => this.refreshUserLeagues());
  }

  postUserData(e) {
    e.preventDefault();
    const {newUser, newPassword } = this.state;
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

  refreshUserLeagues() {
    fetch(`/data/userLeagues/${this.state.username}`, { method: 'get' })
      .then(response => response.json())
      .then(jsonData => this.setState({ leagues: jsonData.map(obj => obj.league) }));
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
    const leagueForm = this.state.isLoggedIn && !this.state.activeLeague ?
      <LeagueForm chooseLeague={this.joinLeague} submit={this.postLeagueData} joinLeague={this.joinLeague}
        leagues={this.props.allLeagues} handleInputTextChange={this.handleInputTextChange} />
      : null;
    return (
      <div className='container-fluid body-container'>
        {login}
        {leagues}
        {signup}
        {leagueForm}
        {leaderboard}
      </div>
    )
  }
};

export default connect(mapStateProps)(App);