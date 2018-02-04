const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
const keys = require('./config/key');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

//Set Cookie Property
app.use(
    cookieSession({
        name: 'session',
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

//Set Heroku or Local host port
const PORT = process.env.PORT || 5000;
app.listen(PORT);