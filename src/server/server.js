const express = require('express');
const Elo = require('arpad');
const pg = require('pg');
const bodyParser = require('body-parser');
const app = express();
const UserCtrl = require('./controllers/userController');
const LeagueCtrl = require('./controllers/leagueController');

const path = require('path');


const jsonBodyParser = bodyParser.json()

app.get('/data/:league', UserCtrl.findUsersOfLeague);
app.get('/data/:league/:username1/:username2', UserCtrl.getNewElo);
app.get('/data/users/:username', UserCtrl.findUser);
app.get('/data/userLeagues/:username', UserCtrl.findUserLeagues);
app.get('/data/getAllLeagues/leagues', LeagueCtrl.findAllLeagues);

app.use(bodyParser.json());
app.post('/data/createNewUser/newUser', UserCtrl.createNewUser);
app.post('/data/createNewLeague/newLeague', LeagueCtrl.createNewLeague);
app.post('/data/users/joinLeague/:user/:league', UserCtrl.joinLeague);

app.get('*', (req, res) => {
  console.log('serving default route');
  res.sendFile(path.resolve('./', 'build', 'index.html'))
})

app.listen(3000);