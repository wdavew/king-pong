const User = require('../../models/User');
const Elo = require('arpad');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const secret = require('../config.js').secret;

function findUsersOfLeague(req, res) {
  User.findAll({
    where: { league: req.params.league },
    order: 'elo DESC'
  }).then((data) => {
    return res.json(data)
  });
}

function authenticateUser(req, res) {
  User.find({ where: { username: req.body.username } })
    .then((user) => {
      req.user = user
      if (!user) return false;
      return user.authenticate(req.body.password)
    })
    .then((authresult) => {
      if (authresult === true) {
        const token = jwt.sign(req.user.username, secret)
        return res.status(200).json({
          id_token: token,
          ok: true
        })
      }
      return res.status(401).json({ message: 'Invalid username or password' });
    });
}


function findUser(req, res) {
  User.find({ where: { username: req.jwtPayload } }).then((data) => {
    console.log('data is', data);
    return res.json(data)
  });
}

function findUserLeagues(req, res) {
  User.findAll({
    where: { username: req.params.username },
    attributes: ['username', 'league']
  }).then((data) => {
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.status(400).end('User not found');
    }
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
    user1.update({ 'elo': elo.newRatingIfLost(user1.elo, user2.elo) })
      .then(user2.update({ 'elo': elo.newRatingIfWon(user2.elo, user1.elo) }))
      .then(res.json('updated elo in postgres'));
  })
}

function createNewUser(req, res) {
  let user;
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      user = data
    })
    .then(() => {
      if (!user) {
        console.log('creating', req.body)
        User.create(req.body)
          .then(() => res.status(200).end())
          .catch((error) => res.status(400).end(error.errors[0].message));
      } else {
        res.status(400).end('User already exists');
      }
    });
}

function joinLeague(req, res) {
  let user;
  console.log(req.body.username);
  console.log(req.body.league);
  User.findAll({ where: { username: req.body.username } })
    .then(data => {
      user = data
    })
    .then(() => {
      if (user.length === 1 && user[0].league === null) {
        user[0].update({ league: req.body.league })
          .then(() => res.status(200).end())
          .catch((error) => res.status(400).end(error));
      } else {
        User.create({
          username: user[0].username,
          password: user[0].password,
          league: req.body.league
        })
          .then(() => res.status(200).end())
          .catch((error) => console.log(error));
      }
    });
}



module.exports = { findUser, findUsersOfLeague, findUserLeagues, getNewElo, createNewUser, joinLeague, authenticateUser };
