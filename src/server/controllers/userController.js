const User = require('../../models/User');
const Elo = require('arpad');
const Promise = require('bluebird')
function findUsersOfLeague(req, res) {
  User.findAll({
    where: { league: req.params.league },
    order: 'elo DESC'
  }).then((data) => {
    return res.json(data)
  });
}

function findUser(req, res) {
  User.find({ where: { username: req.params.username } }).then((data) => {
    console.log(data);
    return res.json(data)
  });
}

function findUserLeagues(req, res) {
  User.findAll({
    where: { username: req.params.username },
    attributes: ['league']
  }).then((data) => {
    console.log(data);
    return res.json(data)
  });
}

function getNewElo(req, res) {
  let user1;
  let user2;
  const elo = new Elo();
  const user1Promise = User.findOne({ where: { username: req.params.username1, league: req.params.league } })
    .then(data => { user1 = data; })
  const user2Promise = User.findOne({ where: { username: req.params.username2, league: req.params.league } })
    .then(data => { user2 = data; })
  Promise.all([user1Promise, user2Promise]).then(() => {
    user1.update({ 'elo': elo.newRatingIfWon(user1.elo, user2.elo) })
      .then(user2.update({ 'elo': elo.newRatingIfLost(user2.elo, user1.elo) }))
      .then(res.json('updated elo in postgres'));
  })
}

module.exports = { findUser, findUsersOfLeague, findUserLeagues, getNewElo };
