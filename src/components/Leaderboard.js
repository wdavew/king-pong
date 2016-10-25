import React, { Component } from 'react';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {};
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
        return<h1>"Hi this is my app"</h1>
  }
}

  export default Leaderboard;