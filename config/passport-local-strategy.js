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
			passReqToCallback: true //this allows us to set the first argument as request
		},
		function (req, email, password, done) {
			//done is the callback reporting to passport.js
			User.findOne({ email: email }, function (err, user) {
				if (err) {
					// console.log("Error occured while finding User!");
					req.flash('error', err);
					return done(err); //reporting error to passport
				}
				if (!user || user.password != password) {
					// console.log("Invalid Username/Password!");
					req.flash('error', 'Invalid Username/Password');
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
	done(null, user.id);
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
    if(req.isAuthenticated()) { //this represents whether a user has signed in or not
		return next(); //if user signed in take him to the next function (controller's action)
    }
    return res.redirect('/users/sign-in'); //else if not signed in
}

//set the user for the views
passport.setAuthenticatedUser = function(req, res, next) {
	if(req.isAuthenticated()) {
		//req.user contains the current signed in user from the session cookie 
		//and we are just sending this to the locals for the views
		res.locals.user = req.user;
	}
	next();
}

module.exports = passport;
