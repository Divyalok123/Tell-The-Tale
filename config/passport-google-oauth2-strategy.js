const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
    }, function(accessToken, refreshToken, profile, done){ //when the accessToken expires the refresh token is used to get a new access token
        //profile will contain users info
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err) {
                console.log('Error finding the user in google passport strategy!: ', err);
                return;
            }

            console.log(profile);

            if(user) { //if found set this user as req.user
                return done(null, user);
            } else { 
                // return done(null, false); //!!Wrong!!

                //if not found, create the user and set it as req.user(sign in that user)
                //we create the user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex') //when a user signs up this will generate a password
                }, function(err, user){
                    if(err) {
                        console.log('Error in creating user!: ', err);
                        return;
                    }

                    return done(null, user);
                });
            }
        })
    }
    
));


module.exports = passport;