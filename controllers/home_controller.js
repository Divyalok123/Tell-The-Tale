const Post = require("../models/post");
const User = require("../models/user");

/*

module.exports.home = function(req, res){
    // console.log(req.cookies); //since cookies are coming in request
    // res.cookie('user_id', 20);//changing the value of the cookie

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

↓ Doing this(↑) using asyn-await

*/

module.exports.home = async function(req, res) {
    /* Error handling using try-catch */
    try {
        /* Asyn await */
        let posts = await Post.find({})
        .sort('-createdAt') //to sort in the reverse chronological order i.e. latest post first
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: { //we need to populate with likes too
                path: 'likes'
            }
        }).populate('comments') //populating the likes of each post and comment
        .populate('likes'); 

        let users = await User.find({});

        //when both the above are done this return will run
        return res.render('home', {
            title: "Tell The Tale",
            posts: posts,
            userProfiles: users
        });
    }catch(err) {
        console.log('Error occured while fetching home items: ', err);
        return;
    }
}

module.exports.about = function(req, res) {
    return res.end('<h1>About us is coming!</h1>');  
};