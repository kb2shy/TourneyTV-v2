const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

    // Let's validate the data before we make a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;