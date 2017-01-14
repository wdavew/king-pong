const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const cors = require('cors');
const dataRoutes = require('./apiRoutes.js');
const UserCtrl = require('./controllers/userController');


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
app.post('/createNewUser', UserCtrl.createNewUser);
app.use('/data', dataRoutes);


server.listen(3000);
