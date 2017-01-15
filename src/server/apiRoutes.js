const jwt = require('jsonwebtoken');
const secret = require('./config.js').secret;
const express = require('express');
const UserCtrl = require('./controllers/userController');
const LeagueCtrl = require('./controllers/leagueController');
const MsgCtrl = require('./controllers/msgController');

const verifyJwt = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, secret, (err, payload) => {
      if (payload) (req.jwtPayload = payload, next());
      else return res.status(401).send('Unauthorized');
    });
  }
  else return res.status(401).end('Unauthorized');
};

const dataRoutes = express.Router();
dataRoutes.use(verifyJwt);

dataRoutes.get('/userInfo',  UserCtrl.findUser, UserCtrl.findUserLeagues);
dataRoutes.get('/league/:league', UserCtrl.getAvailableLeagues, UserCtrl.findUsersOfLeague);
dataRoutes.get('/league/:league/:username/', UserCtrl.getNewElo);
dataRoutes.get('/messages/get', MsgCtrl.getMessages);

dataRoutes.post('/createNewLeague/newLeague', LeagueCtrl.createNewLeague);
dataRoutes.post('/leagues/join', UserCtrl.joinLeague);
dataRoutes.post('/messages/send', UserCtrl.getAvailableLeagues, MsgCtrl.validateNewMsgRecipient,  MsgCtrl.createMessage);

dataRoutes.delete('/messages/delete/:id', MsgCtrl.validateOwner, MsgCtrl.removeMessage);


module.exports = dataRoutes;


