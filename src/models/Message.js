const Sequelize = require('sequelize');

const sequelize = new Sequelize('kingpong', 'davidwilson', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

const Message = sequelize.define('message', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  league: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  sender: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  receiver: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  action: {
    allowNull: false,
    type: Sequelize.STRING,
  },

});

sequelize.sync();

module.exports = Message;