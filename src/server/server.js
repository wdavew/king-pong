const express = require('express');
const Elo = require('arpad');
const pg = require('pg');
const app = express();
const UserCtrl = require('./controllers/userController');

app.get('/data/:league', UserCtrl.findUsersOfLeague);

// const elo = new Elo();
// const alice = 1200;
// const bob = 1300;
// console.log(`alice will have an elo of ${elo.newRatingIfWon(alice, bob)} if she wins`)


app.listen(3000);