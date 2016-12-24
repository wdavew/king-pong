const Sequelize = require('sequelize');
const testData = require('./testdata');
const bcrypt = require('bcrypt');

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
    validate: {
      notEmpty: true,
    },
    field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
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
}, {
    instanceMethods: {
      authenticate: (plainTextPwd) => (
        new Promise((resolve, reject) => {
          bcrypt.compare(plainTextPwd, this.password, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          })
        })
      )
    }
  })


User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);

function hashPassword(user) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
      if (err) (console.log(err), reject(err));
      else resolve((console.log(hashedPassword), hashedPassword))
    })
  })
    .then((hashedPassword) => { user.password = hashedPassword })
}


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


sequelize.sync({ force: true })
  .then(() => User.bulkCreate(testData.userData, {individualHooks: true}))
  .then(() => League.bulkCreate(testData.leagueData))
  .then(() => sequelize.close());