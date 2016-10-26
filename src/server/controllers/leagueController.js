const League = require('../../models/League');
const Promise = require('bluebird');

function findAllLeagues(req, res) {
  const leagues = [];
  League.findAll({ attributes: ['league'] }).then((data) => {
    data.forEach(obj => leagues.push(obj.league));
    return res.json(leagues);
  });
}

function createNewLeague(req, res) {
  let league;
  League.findOne({ where: { league: req.body.league } })
    .then((data) => {
      league = data
    })
    .then(() => {
      if (!league) {
        console.log('creating', req.body)
        League.create(req.body)
          .then(() => res.status(200).end())
          .catch((error) => res.status(400).end(error.errors[0].message));
      } else {
        res.status(400).end('That league already exists');
      }
    });
}

module.exports = { findAllLeagues, createNewLeague };
