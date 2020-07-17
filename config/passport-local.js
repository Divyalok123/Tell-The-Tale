//requiring passport
const passport = require("passport");
//requiring passport-local strategy
const LocalStrategy = require("passport-local").Strategy;

//importing user
const User = require("../models/user");

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		function (email, password, done) {
			//done is the callback reporting to passport.js
			User.findOne({ email: email }, function (err, user) {
				if (err) {
					console.log("Error occured while finding User!");
					return done(err); //reporting error to passport
				}
				if (!user || user.password != password) {
					console.log("Invalid Username/Password!");
					return done(null, false); //first argument (representing error)-> no error and second argument (user found or not) -> not found
				}
				console.log("User found!");
				return done(null, user); //user found.. now passing the user
			});
		},
	),
);

//serializing the user to decide the key for the cookies
//i.e. whichever user signs in we send it's key to the cookie
passport.serializeUser(function (user, done) {
	done(null, user);
});

//deserializing the user from the key we get from the cookie
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if (err) {
			console.log("Error occured while deserializing the user!");
			return done(err);
		}
		return done(null, user);
	});
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-in');
}

module.exports = passport;
