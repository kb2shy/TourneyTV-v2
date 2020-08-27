const express = require('express');
const router = express.Router();

const Message = require('../models/Message');
const User = require('../models/User');

router.get('/', (req, res, next) => {
    Message.find({})
    .populate('sender', 'name')
    .then(messages => {
        const msgs = messages.map(message => ({
            sender: message.sender.name,
            content: message.content
        }))

        res.json(msgs);
    })
    .catch(error => console.log(error));
})

router.post('/', (req, res, next) => {
    const message = new Message({
        sender: req.body.sender,
        content: req.body.content
    });

    message.save()
        .then(result => res.json(result))
        .catch(error => res.send(error))
    
})

module.exports = router;