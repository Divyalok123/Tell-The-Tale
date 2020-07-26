const User = require("../models/user");

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err, user){
        return res.render("user_profile", {
            title: 'Profile',
            user_profile: user
        });
    });
};

module.exports.update = function(req, res) {
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err) {
            return res.redirect('back');
        });
        req.flash('success', 'Profile Updated Successfully!');
    } else {
        req.flash('error', 'Error updating profile');
        return res.status(401).send('Unauthorized');
    }
}

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
    req.flash('success', 'Logged Out Successfully'); //this message needs to tranfered to response 

    return res.redirect('/'); //we can pass the flash message to locals here but we will create a custom middle ware for that
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
                req.flash('success', 'You have signed up successfully!');
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            req.flash('error', 'Already registered! Please sign in. ')
            return res.redirect('back');
        }

    });
};

//signing in
module.exports.login = function (req, res) {
    //creating flash message
             /*type*/      /*message*/
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/'); //session is created
};

