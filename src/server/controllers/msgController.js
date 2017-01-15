const Message = require('../../models/Message');
const Promise = require('bluebird');
const User = require('../../models/User');

function validateNewMsgRecipient(req, res, next) {
  User.findAll({
    where: { league: req.body.league, username: req.body.receiver }
  })
    .then((result) => {
      if (result.length) next();
      else return res.status(400).end('Invalid recipient');
    });
}

function validateOwner(req, res, next) {
  Message.find({
    where: { id: req.params.id },
  })
    .then((result) => {
      if (!result) return res.status(400).end('Message does not exist');
      else if (result.receiver === req.jwtPayload) next();
      else return res.status(401).end('Unauthorized');
    });
}

function createMessage(req, res) {
  Message.create({
    league: req.body.league,
    sender: req.jwtPayload,
    receiver: req.body.receiver,
    action: req.body.action
  }).then(() => res.status(200).end('done'));
}

function getMessages(req, res) {
  Message.findAll({
    where: { receiver: req.jwtPayload },
    order: '"createdAt" DESC',
  })
    .then(data => res.json(data));
}

function removeMessage(req, res) {
  Message.findById(req.params.id)
    .then((msg) => {
      if (msg) {
        console.log('found message');
        console.log(msg.id);
        msg.destroy();
        return res.status(200).end('Deleted message from database');
      }
      return res.status(400).end('Message already gone');
    });
}

function forceSendMsg(msgObj) {
  return Message.create(msgObj).then(() => undefined);
}

function getLastMsg(receiver) {
  return Message.findAll({
    where: { receiver },
    order: '"createdAt" DESC',
  })
    .then(data => data[0]);
}

module.exports = {
  validateNewMsgRecipient,
  validateOwner,
  createMessage,
  getMessages,
  removeMessage,
  getLastMsg,
  forceSendMsg,
};
