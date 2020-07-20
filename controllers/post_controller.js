const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req, res) {
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err) {
        if(err) {
            console.log("Error! Can't create post");
            return;
        }
        return res.redirect('back'); 
    });
}

module.exports.destroy = function(req, res) {
    Post.findById(req.params.id, function(err, post){
        if(post.user == req.user.id) // 'req.user.id'? when comparing two id we need to convert them into strings and mongoose provides a way 
                                     // to convert it to a string (.id converts an object's id into string) 
        {
            //deleting the post
            post.remove();
            
            //deleting the comments in the post
            Comment.deleteMany({
                post: req.params.id
            }, function(err) {
                if(err) {
                    console.log('Error occured while deleting comments!');
                }
                return res.redirect('back');
            })
        }

        else
        {
            return res.redirect('back');
        }
    })
}