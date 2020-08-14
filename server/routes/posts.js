const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User');

router.get('/', verify, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.send(user);
})

module.exports = router;