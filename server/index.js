const express = require('express');
const app = express();

// import routes
const authRoute = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server up and running on PORT ${PORT}`));