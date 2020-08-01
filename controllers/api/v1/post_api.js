const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req, res) {

    let posts = await Post.find({})
        .sort('-createdAt') //to sort in the reverse chronological order i.e. latest post first
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.status(200).json({
        message: 'List of posts',
        posts: posts
    });
}

module.exports.destroy = async function (req, res) {
	try {
		let post = await Post.findById(req.params.id);
		if (post.user == req.user.id) {
			//deleting the post
			post.remove();

			//deleting the comments in the post
			await Comment.deleteMany({
				post: req.params.id,
			});
            
            return res.json(200, {
                message: 'Post deleted!'
            });

			// req.flash("success", "Post is deleted!");
		} else {
			return res.status(401).json({
				message: 'You can\'t delete this post!'
			});
		}

	} catch (err) {
		// req.flash("error", `Error! ${err}`);
        // return res.redirect("back");
        
        return res.status(500).json({
            message: 'Internal Server Error'
        });
	}
};