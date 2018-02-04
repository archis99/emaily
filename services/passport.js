const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); //Takes the ID from mongo DB
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, 
(accessToken,refreshToken,profile,done) => {
    User.findOne({googleId: profile.id})
    .then( exisistingUser => {
        if(exisistingUser){
            done(null, exisistingUser);
        }
        else{
            new User({ googleId: profile.id}).save()
            .then(user => done(null, user));
        }
    });
}));