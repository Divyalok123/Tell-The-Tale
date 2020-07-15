/** @format */

const User = require("../models/user");

module.exports.profile = function (req, res) {
	// res.end('<h1>Users profile are running!</h1>');
	return res.render("user_profile", {
		user: "Divyalok",
		title: "Tell the tale",
	});
};

//rendering sign-up page
module.exports.signUp = function (req, res) {
	return res.render("user_sign_up", {
		title: "SignUp | Tell The Tale",
	});
};

//rendering sign-in page
module.exports.signIn = function (req, res) {
	return res.render("user_sign_in", {
		title: "SignIn | Tell The Tale",
	});
};

//get the sign-up data
module.exports.create = function (req, res) {
	//check if the password and confirm-pass fields are same
	if (req.body.password != req.body.confirm_pass) {
		console.log("Passwords don't match");
		return res.redirect("back");
	}

	//first we will check if the user already exists
	//if not we will create
	User.findOne({ email: req.body.email }, function (err, user) {
        if(err)
        {
            console.log("Error in signing up!");
            return;
        }

        if(!user) {
            User.create(req.body, function(err, user){
                if(err)
                {
                    console.log('Error in creating the user!');
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            return res.redirect('back');
        }

    });
};

//get the login data
module.exports.login = function (req, res) {
};
