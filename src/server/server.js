const express = require('express');
const Elo = require('arpad');
const pg = require('pg');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const UserCtrl = require('./controllers/userController');
const LeagueCtrl = require('./controllers/leagueController');
const MsgCtrl = require('./controllers/msgController');
const path = require('path');
const io = require('socket.io')(server);
const config = require('./config.js');
const cors = require('cors');
const dataRoutes = require('./apiRoutes.js');


io.on('connection', function (socket) {
  socket.on('reloadUserRequest', function (data) {
    console.log('user socket emitting')
    io.emit('reloadUsers');
  });

  socket.on('messageSent', function (data) {
    console.log('message socket emitting')
    io.emit('updateMessages');
  });
});

const jsonBodyParser = bodyParser.json()
app.use(bodyParser.json());
app.use(cors());


app.post('/sessions/create', UserCtrl.authenticateUser);

app.use('/data', dataRoutes);

app.get('/data/league/:league', UserCtrl.findUsersOfLeague);
app.get('/data/league/:league/:username1/:username2', UserCtrl.getNewElo);
app.get('/data/users/:username', UserCtrl.findUser);
app.get('/data/userLeagues/:username', UserCtrl.findUserLeagues);
app.get('/data/getAllLeagues/leagues', LeagueCtrl.findAllLeagues);

app.post('/data/createNewUser/newUser', UserCtrl.createNewUser);
app.post('/data/createNewLeague/newLeague', LeagueCtrl.createNewLeague);
app.post('/data/leagues/join', UserCtrl.joinLeague);
app.post('/data/messages/send', MsgCtrl.createMessage);
app.get('/data/messages/get/:username', MsgCtrl.getMessages);
app.delete('/data/messages/delete/:id', MsgCtrl.removeMessage);

server.listen(3000);


