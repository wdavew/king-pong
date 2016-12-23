import React, { Component } from 'react';
import Leaderboard from './Leaderboard.js';
import LeagueList from './LeagueList.js';
import Login from './Login.js';
import Signup from './Signup.js';
import LeagueForm from './LeagueForm.js';
import { updateNameInput, updatePassInput, loginUser, logoutRequest } from '../actions/authActions';
import { Router, Route, Link, browserHistory } from 'react-router'
import { connect } from 'react-redux';
import { fetchLeagues } from '../actions/leagueActions.js';
require('../static/mainstyle.css');

const mapStateProps = (state) => ({
  allLeagues: state.leagues.allLeagues,
  user: state.login.user
})

class App extends Component {
  syncLeagues() {
    this.props.dispatch(fetchLeagues());
  }

  componentDidMount() {
    console.log('app has mounted and is requesting available leagues');
    this.syncLeagues();
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

  refreshUserLeagues() {
    fetch(`/data/userLeagues/${this.state.username}`, { method: 'get' })
      .then(response => response.json())
      .then(jsonData => this.setState({ leagues: jsonData.map(obj => obj.league) }));
  }

  render() {
    // const leagues = <LeagueList leagues={'list of leauges'} enterLeague={() => null} />
    // const leaderboard = <Leaderboard league={'TBD'} username={'TBD'} />
    const login = <Login />
    const signup = <Signup submit={this.postUserData} handleInputTextChange={this.handleInputTextChange} />
    // const leagueForm = <LeagueForm chooseLeague={this.joinLeague} submit={this.postLeagueData} joinLeague={this.joinLeague}
        // leagues={this.props.allLeagues} handleInputTextChange={this.handleInputTextChange} />
    return (
      <div className='container-fluid body-container'>
        {login}
      </div>
    )
  }
};

export default connect(mapStateProps)(App);