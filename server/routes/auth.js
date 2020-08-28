const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

// Register route
router.post('/register', async (req, res) => {

    // Let's validate the data before we make a user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if user email is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send("Email already exists");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    // Save user to database
    try {
        const savedUser = await user.save();
        res.send({ user: savedUser._id });
    } catch (error) {
        res.status(400).send(error)
    }
});

// Login route
router.post('/login', async (req, res) => {
    // Validate the data the user used to login
    const { error, value } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email exists in db
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid login.");

    // Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid login");

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);  
    res.header('auth-token', token).send(token);

})

module.exports = router;