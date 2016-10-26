const Message = require('../../models/Message');
const Promise = require('bluebird');


function createMessage(req, res) {
  Message.create({
    league: req.body.league,
    sender: req.body.sender,
    receiver: req.body.receiver,
    action: req.body.action
  })
}

function getMessages(req, res) {
  Message.findAll({
    where: { receiver: req.params.username },
    order: '"createdAt" DESC',
  })
    .then(data => res.json(data));
}

function removeMessage(req, res) {
  Message.find({ id: req.params.id })
    .then((msg) => {
      if (msg) {
        msg.destroy();
        return res.end('Deleted message from database');
      }
      return res.status(400).end('Message already gone');
    });
}



module.exports = { createMessage, getMessages, removeMessage };
