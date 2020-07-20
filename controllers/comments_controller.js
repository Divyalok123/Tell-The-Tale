const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post_id, function(err, post){
        if(post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post_id,
                user: req.user._id
            }, function(err, comment){
                if(err) {
                    console.log('Error occured while creating comment!');
                    return;
                }

                post.comments.push(comment);
                post.save();

                return res.redirect('/');
            })
        }
    });
};

module.exports.destroy = function(req, res) {
    Comment.findById(req.params.id, function(err, comment){
        if(err) {
            console.log('Error occured while finding comment for the id: ', req.params.id);
            return;
        }

        if(comment.user == req.user.id) {
            //before deleting a comment we need to get the post id of the comment
            //and then find the comment in the post and delete from there too

            let postid = comment.post;

            comment.remove();
                                                    //pull this comment id from comments in found post and delete it (updating the post) 
            Post.findByIdAndUpdate(postid, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }
        else
            return res.redirect('back');
    });
}