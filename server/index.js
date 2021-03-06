const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const chatroomRoute = require('./routes/chatroomRoute');
const messageRoute = require('./routes/messageRoute');

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db")
})

// middleware
app.use(express.json());

// route middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/chatrooms', chatroomRoute);
app.use('/api/messages', messageRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));