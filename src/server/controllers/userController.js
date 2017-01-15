const User = require('../../models/User');
const Elo = require('arpad');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const secret = require('../config.js').secret;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('kingpong', 'davidwilson', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

function getAvailableLeagues(req, res, next) {
  const leagueToCheck = req.params.league !== undefined ? req.params.league : req.body.league;
  User.findAll({
    where: { username: req.jwtPayload },
    attributes: ['league'],
  })
    .then((leagues) => {
      const leaguesArray = leagues.map(item => item.dataValues.league);
      req.userLeagues = leaguesArray;
      if (!(req.userLeagues.includes(leagueToCheck))) {
        return res.status(401).send('Unauthorized');
      }
      else next();
    });
}

function findUsersOfLeague(req, res) {
  User.findAll({
    where: { league: req.params.league },
    order: 'elo DESC'
  }).then((data) => {
    return res.json(data)
  })
    .catch(err => (console.log(err), res.status(500).end()));
}

function authenticateUser(req, res) {
  User.find({ where: { username: req.body.username } })
    .then((user) => {
      req.user = user;
      if (!user) return false;
      return user.authenticate(req.body.password);
    })
    .then((authresult) => {
      if (authresult === true) {
        const token = jwt.sign(req.user.username, secret);
        return res.status(200).json({
          id_token: token,
          ok: true,
        })
      }
      return res.status(401).json({ message: 'Invalid username or password' });
    });
}

function findUser(req, res, next) {
  User.find({
    where: { username: req.jwtPayload },
    attributes: ['username', 'league', 'elo', 'games', 'league', 'wins'],
  }).then((data) => {
    res.userData = data.get({ plain: true });
    next();
  });
}

function findUserLeagues(req, res) {
  sequelize.query(`SELECT league FROM users WHERE username='${req.jwtPayload}'`)
    .spread((data) => {
      const leagues = data.map(result => result.league);
      if (data.length > 0) {
        res.userData.leagues = leagues;
        return res.json(res.userData);
      } else {
        return res.status(400).end('User not found');
      }
    });
}

function getNewElo(req, res) {
  let user1;
  let user2;
  const elo = new Elo();
  const user1Promise = User.findOne({ where: { username: req.jwtPayload, league: req.params.league } })
    .then(data => { user1 = data; });
  const user2Promise = User.findOne({ where: { username: req.params.username, league: req.params.league } })
    .then(data => { user2 = data; });
  Promise.all([user1Promise, user2Promise]).then(() => {
    user1.update({ 'elo': elo.newRatingIfLost(user1.elo, user2.elo) })
      .then(user2.update({ 'elo': elo.newRatingIfWon(user2.elo, user1.elo) }))
      .then(res.status(200).end('updated elo in postgres'));
  })
}

function dropUser(username, league) {
  const whereClause = league ? { username, league } : { username };
  return User.findOne({ where: whereClause })
    .then((user) => {
      if (user) user.destroy();
    });
}

function forceChangeElo(username, league, elo) {
  return User.findOne( { where: { username, league } })
    .then(user => user.update({ elo }));
}

function createNewUser(req, res) {
  let user;
  User.findOne({ where: { username: req.body.username } })
    .then((data) => {
      user = data
    })
    .then(() => {
      if (!user) {
        User.create(req.body)
          .then(() => res.status(200).end())
          .catch((error) => {
            res.status(400).end(error.errors[0].message)
          })
      } else {
        res.status(400).end('User already exists');
      }
    });
}

function joinLeague(req, res) {
  User.findAll({ where: { username: req.jwtPayload } })
    .then((user) => {
      // user exists
      if (user.length) {
        // if user belongs to at least one league
        const userLeagues = user.map(data => data.league);
        if (userLeagues.length) {
          // user already belongs to specified league

          if ((userLeagues.filter(league => league === req.body.league)).length) {
            return res.status(400).end('You already belong to that league.');
          }
          User.create({
            username: user[0].username,
            password: user[0].password,
            league: req.body.league,
          })
            .then(() => res.status(200).end())
            .catch(error => res.status(500).end(error));
        } else {
          user[0].update({ league: req.body.league })
            .then(() => res.status(200).end())
            .catch(error => res.status(500).end(error));
        }
      } else {
        return res.status(400).end('Invalid user');
      }
    });
}

module.exports = {
  getAvailableLeagues,
  findUser,
  findUsersOfLeague,
  findUserLeagues,
  getNewElo,
  createNewUser,
  joinLeague,
  authenticateUser,
  dropUser,
  forceChangeElo,
};
