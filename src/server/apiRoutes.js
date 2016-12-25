const jwt = require('jsonwebtoken');
const secret = require('./config.js').secret;
const express = require('express');
const UserCtrl = require('./controllers/userController');

const verifyJwt = (req, res, next) => {
  console.log('verifying jwt');
  const token = req.headers['x-access-token'];
  console.log('token is', token);
  if (token) {
    jwt.verify(token, secret, (err, payload) => {
      console.log('payload is', payload);
      if (payload) (req.jwtPayload = payload, next());
      else res.status(401).send('Invalid JWT');
    });
  }
};

const dataRoutes = express.Router();
dataRoutes.use(verifyJwt);

dataRoutes.get('/userInfo',  UserCtrl.findUser)

module.exports = dataRoutes;


