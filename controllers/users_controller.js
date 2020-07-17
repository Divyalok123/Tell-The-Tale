const User = require("../models/user");
const { response } = require("express");

module.exports.profile = function (req, res) {
    if(req.cookies.user_id) {
        if(req.cookies.user_id == "null") {
            console.log("You logged out! Please login again");
            return res.redirect('/users/sign-in');
        }
        User.findById(req.cookies.user_id, function(err, user) {
            if(user) {
                return res.render('user_profile', {
                    title: "Tell The Tale",
                    user: user.name,
                    email: user.email,
                    id: user.id
                });
            }
        });
    }
    else {
        return res.redirect('/users/sign-in');
    }
};

//rendering sign-up page
module.exports.signUp = function (req, res) {
	return res.render("user_sign_up", {
		title: "Sign Up | Tell The Tale",
	});
};

//rendering sign-in page
module.exports.signIn = function (req, res) {
	return res.render("user_sign_in", {
		title: "Sign In | Tell The Tale",
	});
};

module.exports.signOut = function(req, res) {
    if(req.cookies.user_id) {
        res.cookie('user_id', "null");
    }
    return res.redirect('/users/sign-in');
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
            console.log('User exists');
            return res.redirect('back');
        }
    });
};

//get the login data
module.exports.login = function (req, res) {
    //find the user 
    User.findOne({
        email: req.body.username
    }, function(err, user){
        if(err)
        {
            console.log('Error in finding the user');
            return;
        }

        //handling if the user is found
        if(user) {
            //handle if the password don't match
            if(user.password != req.body.password)
            {
                console.log("Passwords don't match");
                return res.redirect('back');
            }
            //handling successful login
            else
            {
                console.log('User found!');
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile');
            }

        }
        else //handling if user is not found
        {
            console.log('User not found');
            return res.redirect('back'); 
        }
    });
};