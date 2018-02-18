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
//Changes with async/await syntax instead of .then()
async (accessToken,refreshToken,profile,done) => {
    const exisistingUser = await User.findOne({googleId: profile.id});
    if(exisistingUser){
        //Debug Console
        console.log(exisistingUser);
        //done function (method of Passport) with exisisting User
        return done(null, exisistingUser);
    }

    const user = await new User({ googleId: profile.id}).save();
    //done function (method of Passsport) with new user
    done(null, user);
}));