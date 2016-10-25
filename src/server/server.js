const express = require('express');
const Elo = require('arpad');
const pg = require('pg');
const app = express();
const UserCtrl = require('./controllers/userController');
const path = require('path');

app.get('/data/:league', UserCtrl.findUsersOfLeague);
app.get('/data/:league/:username1/:username2', UserCtrl.getNewElo);
app.get('/data/users/:username', UserCtrl.findUser);
app.get('/data/userLeagues/:username', UserCtrl.findUserLeagues);


app.get('*', (req, res) => {
  console.log('serving default route');
  res.sendFile(path.resolve('./', 'build', 'index.html'))
})

app.listen(3000);