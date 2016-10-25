import React, { Component } from 'react';
import Leaderboard from './Leaderboard.js';
import Home from './Home';
import { Router, Route, Link, browserHistory } from 'react-router'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: '',
      password: '',
      leauges: [],
    }
    this.submitLogin = this.bind(this.submitLogin);
  }

  submitLogin() {
    console.log('submitting login');
    fetch(`/data/users/${this.state.username}`, { method: 'get' })
      .then(response => response.json())
      .then((jsonData) => {
        const leagues = jsonData.map(obj => obj.league);
        this.setState({ leagues: leagues })
      })
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Home} username={this.state.username} password={this.state.password}
        submitLogin = {this.submitLogin} />
        <Route path='/Leaderboard' component={Leaderboard} />
      </Router>
    )
  }
};

export default App;