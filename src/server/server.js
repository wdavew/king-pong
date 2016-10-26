const express = require('express');
const Elo = require('arpad');
const pg = require('pg');
const bodyParser = require('body-parser');
const app = express();
const UserCtrl = require('./controllers/userController');
const LeagueCtrl = require('./controllers/leagueController');
const MsgCtrl = require('./controllers/msgController');

const path = require('path');
pg.connect("postgres://davidwilson:password@localhost/kingpong", function (err, client) {
  if (err) console.log(err);
  else {
    client.query("LISTEN updates");
    client.on('notification', function (msg) {
      console.log(msg);
    });
  }
})



const jsonBodyParser = bodyParser.json()

app.get('/data/league/:league', UserCtrl.findUsersOfLeague);
app.get('/data/league/:league/:username1/:username2', UserCtrl.getNewElo);
app.get('/data/users/:username', UserCtrl.findUser);
app.get('/data/userLeagues/:username', UserCtrl.findUserLeagues);
app.get('/data/getAllLeagues/leagues', LeagueCtrl.findAllLeagues);

app.use(bodyParser.json());
app.post('/data/createNewUser/newUser', UserCtrl.createNewUser);
app.post('/data/createNewLeague/newLeague', LeagueCtrl.createNewLeague);
app.post('/data/leagues/join', UserCtrl.joinLeague);
app.post('/data/messages/send', MsgCtrl.createMessage);
app.get('/data/messages/get/:username', MsgCtrl.getMessages);
app.delete('/data/messages/delete/:id', MsgCtrl.removeMessage);

// app.get('*', (req, res) => {
//   console.log('serving default route');
//   res.sendFile(path.resolve('./', 'build', 'index.html'))
// })

app.listen(3000);