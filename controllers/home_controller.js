const Post = require("../models/post");
const User = require("../models/user");


module.exports.home = function(req, res){
    // console.log(req.cookies); //since cookies are coming in request
    // res.cookie('user_id', 20);//changing the value of the cookie

    // Post.find({}, function(err, posts) {
    //     if(err) {
    //         console.log('Error occured!');
    //         return;
    //     }
    //     return res.render('home', {
    //         title: "Tell the tale",
    //         person: "Divyalok",
    //         posts: posts
    //     })
    // });

    //pre-populating
    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts) {
        User.find({}, function(err, users) {
            return res.render('home', {
                title: "Tell The Tale",
                posts: posts,
                userProfiles: users
            });
        })
    });
};

module.exports.about = function(req, res) {
    return res.end('<h1>About us is coming!</h1>');
};