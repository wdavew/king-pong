const League = require('../../models/League');
const Promise = require('bluebird');

function deleteLeague(leagueName) {
  return League.findOne({where: { league: leagueName }})
  .then((league) => {
    if (league) league.destroy();
  })
}

function createNewLeague(req, res) {
  let league;
  League.findOne({ where: { league: req.body.league } })
    .then((data) => {
      league = data
    })
    .then(() => {
      if (!league) {
        League.create(req.body)
          .then(() => res.status(200).end())
          .catch((error) => res.status(400).end(error.errors[0].message));
      } else {
        res.status(400).end('That league already exists');
      }
    });
}

module.exports = { createNewLeague, deleteLeague };

