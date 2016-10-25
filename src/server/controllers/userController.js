const User = require('../../models/User');
const Elo = require('arpad');

function findUsersOfLeague(req, res) {
  User.findAll({ where: { league: req.params.league } }).then((data) => {
    console.log(data);
    res.json(data)
  });
}

function findUser(req, res) {
  User.find({ where: { username: req.params.username } }).then((data) => {
    console.log(data);
    res.json(data)
  });
}

function getNewElo(req, res) {
  let user1;
  let user2;
  const elo = new Elo();
  const user1Promise = User.findOne({ where: { username: req.params.username1 } }).then(data => { user1 = data; })
  const user2Promise = User.findOne({ where: { username: req.params.username2 } }).then(data => { user2 = data; })
  Promise.all([user1Promise, user2Promise]).then((fullfill, reject) => {
      const newUser1Elo = elo.newRatingIfWon(user1.elo, user2.elo);
      const newUser2Elo = elo.newRatingIfLost(user2.elo, user1.elo);
      console.log({ yourNewElo: newUser1Elo, theirNewElo: newUser2Elo })
      res.json({ yourNewElo: newUser1Elo, theirNewElo: newUser2Elo });
    })
}

module.exports = { findUsersOfLeague, getNewElo };
