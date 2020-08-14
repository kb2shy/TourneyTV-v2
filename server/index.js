const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

// import routes
const authRoute = require('./routes/auth');

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("connected to db")
})

// middleware
app.use(express.json());

// route middlewares
app.use('/api/user', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));