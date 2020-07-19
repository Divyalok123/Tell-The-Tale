const User = require("../models/user");

module.exports.profile = function (req, res) {
    // console.log(req);
	return res.render("user_profile", {
        title: 'Profile'
	});
};

//rendering sign-up page
module.exports.signUp = function (req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

	return res.render("user_sign_up", {
		title: "Sign Up | Tell The Tale",
	});
}

//rendering sign-in page
module.exports.signIn = function (req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

	return res.render("user_sign_in", {
		title: "Sign In | Tell The Tale",
	});
}

//for sign-out
module.exports.signOut = function(req, res) {
    req.logOut(); //method provided by passport
    return res.redirect('/');
}

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

//user has signed in.. now redirect
module.exports.login = function (req, res) {
    return res.redirect('/'); //session is created
};
