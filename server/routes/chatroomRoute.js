const router = require('express').Router();
const Chatroom = require('../models/Chatroom');

router.get('/', (req, res, next) => {
    Chatroom.find({})
        .populate('createdBy', 'name')
        .then(chatrooms => res.json(chatrooms))
        .catch(error => console.log(error))
})

router.post('/', (req, res, next) => {
    const chatroom = new Chatroom({
        createdBy: req.body.user,
        chatroomName: req.body.chatroomName
    })

    chatroom.members.push(req.body.user);

    chatroom.save()
        .then(result => console.log(result))
        .catch(error => console.log(error))

    next();
})

module.exports = router;