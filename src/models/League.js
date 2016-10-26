const Sequelize = require('sequelize');

const sequelize = new Sequelize('kingpong', 'davidwilson', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const League = sequelize.define('league', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  league: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = League;