const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;//to extract JWT from the header

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tell_the_tale'
}


//telling passport to user JWT strategy
passport.use(new JWTStrategy(opts, function(jwtPayload, done){ //payload contains the info of the user and done is the callback     
    User.findById(jwtPayload._id, function(err, user){
        if(err) {
            console.log('Error finding user in JWT');
            return;
        } 

        if(user) { //we don't need to match the password here as we are matching the JWT
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
})); 





module.exports = passport;