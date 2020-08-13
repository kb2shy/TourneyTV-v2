const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// Connect to DB
mongoose.connect(`${process.env.MONGODB_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db")
})

// import routes
const authRoute = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));