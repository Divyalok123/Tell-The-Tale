const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async function (req, res) {
	try{
		await Post.create(
			{
				content: req.body.content,
				user: req.user._id,
			});
			req.flash('success', 'Post Published');
			return res.redirect("back");
	}catch(err){
		req.flash('error', `Error! ${err}`);
		return res.redirect("back");
	}
};

/*
module.exports.destroy = function (req, res) {
	Post.findById(req.params.id, function (err, post) {
		if (post.user == req.user.id) {
			// ↑ 'req.user.id'? when comparing two id we need to convert them into strings and mongoose provides a way
			// to convert it to a string (.id converts an object's id into string)
			//deleting the post
			post.remove();

			//deleting the comments in the post
			Comment.deleteMany(
				{
					post: req.params.id,
				},
				function (err) {
					if (err) {
						console.log("Error occured while deleting comments!");
					}
					return res.redirect("back");
				},
			);
		} else {
			return res.redirect("back");
		}
	});
};
*/

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
			req.flash('success', 'Post is deleted!');
		} else {
			req.flash('error', "You can't delete this post!");
		}
		
		return res.redirect("back");
	} catch (err) {
		req.flash('error', `Error! ${err}`);
		return res.redirect("back");
	}
};
