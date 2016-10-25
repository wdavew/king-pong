const Sequelize = require('sequelize');
const userData = require('./testdata');

const sequelize = new Sequelize('kingpong', 'davidwilson', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    field: 'username' // Will result in an attribute that is firstName when user facing but f  in the database
  },
  elo: {
    type: Sequelize.INTEGER,
  },
  games: {
    type: Sequelize.INTEGER,
  },
  wins: {
    type: Sequelize.INTEGER,
  },
  league: {
    type: Sequelize.STRING,
  },
  imglink: {
    type: Sequelize.STRING,
  }
});

sequelize.sync({force: true})
.then( () => User.bulkCreate(userData))
.then( () => sequelize.close());
