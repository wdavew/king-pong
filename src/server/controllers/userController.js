const User = require('../../models/User');


function findUsersOfLeague(req, res) {
  User.findAll( { where: { league: req.params.league } } ).then((data) => {
    console.log(data);
    res.json(data)
  });
}

module.exports = { findUsersOfLeague };
