const express = require('express');
const Elo = require('arpad');
const pg = require('pg');
const app = express();
const UserCtrl = require('./controllers/userController');

app.get('/data/:league', UserCtrl.findUsersOfLeague);
app.get('/data/:league/:username1/:username2', UserCtrl.getNewElo);

app.listen(3000);