const Sequelize = require('sequelize');
const testData = require('./testdata');

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
    allowNull: true,
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

const League = sequelize.define('league', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  league: {
    allowNull: true,
    type: Sequelize.STRING,
  },
});

const triggerQuery = `
CREATE OR REPLACE FUNCTION notify_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('updates', TG_TABLE_NAME );
  RETURN new;
END;
$$ LANGUAGE plpgsql;
`

function createTrigger(tableName) {
  return `
CREATE TRIGGER ${tableName}trigger AFTER insert or update or delete on ${tableName} execute procedure notify_trigger();
`
}

sequelize.sync({ force: true })
  .then(() => User.bulkCreate(testData.userData))
  .then(() => League.bulkCreate(testData.leagueData))
  .then(() => sequelize.query(triggerQuery))
  .then(() => sequelize.query(createTrigger('users')))
  .then(() => sequelize.query(createTrigger('messages')))
  .then(() => sequelize.close());