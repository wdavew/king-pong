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
  Message.remove({id: req.params.id})
    .then(data => res.json(data));
}



module.exports = { createMessage, getMessages };
