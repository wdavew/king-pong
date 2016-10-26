const Sequelize = require('sequelize');

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
    allowNull: false,
    field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  elo: {
    allowNull: false,
    defaultValue: 1200,
    type: Sequelize.INTEGER,
  },
  games: {
    allowNull: true,
    defaultValue: 0,
    type: Sequelize.INTEGER,
  },
  wins: {
    allowNull: true,
    defaultValue: 0,
    type: Sequelize.INTEGER,
  },
  league: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  imglink: {
    allowNull: true,
    type: Sequelize.STRING,
  }
});

module.exports = User;