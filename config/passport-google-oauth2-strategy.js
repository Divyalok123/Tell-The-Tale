const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
    clientID: "194770133150-j9537tkqima5aqvpehjqa1c4u21ksjle.apps.googleusercontent.com",
    clientSecret: "l8vTu341CXiwVLy58xwJ9gok",
    callbackURL: "http://localhost:8000/users/auth/google/callback"

    }, function(accessToken, refreshToken, profile, done){ //when the accessToken expires we use the refresh token to get a new access token
        //profile will contain users info

        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err) {
                console.log('Error finding the user in google strategy passport!: ', err);
                return;
            }

            console.log(profile);

            if(user) { //if found set this user as req.user
                return done(null, user);
            } else { //if not, create the user and set it as req.user(sign in that user)
                // return done(null, false); //!!Wrong!!

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