const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");
const Like = require('../models/like');

module.exports.create = async function (req, res) {
	try {
		let post = await Post.create({
			content: req.body.content,
			user: req.user._id,
		});

		//check if the request is a ajax request from home_post.js createpost
		//xhr -> xmlHttpRequest
		if (req.xhr) {
			//populating user with name(only)
			//execPopulate needs to be called for an existing document for populate to execute
			let new_post = await post.populate("user", "name").execPopulate();
			// console.log("poulated post:", post);
			return res.status(200).json({
				//200 → success
				data: {
					post: new_post,
				},
				message: "Post created!", //this will check if the post is created
			});
		}

		req.flash("success", "Post Published!");
		return res.redirect("back");
	} catch (err) {
		req.flash("error", `Error! ${err}`);
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
			await Like.deleteMany({likeable: post._id, onModel: 'Post'}); //!may need to change!
			await Like.deleteMany({_id: {$in: post.comments}});

			//deleting the post
			post.remove();

			//deleting the comments in the post
			await Comment.deleteMany({
				post: req.params.id,
			});

			if (req.xhr) {
				return res.status(200).json({
					data: {
						post_user_id: req.params.id,
					},
					message: "Post deleted!",
				});
			}

			req.flash("success", "Post is deleted!");
		} else {
			req.flash("error", "You can't delete this post!");
		}

		return res.redirect("back");
	} catch (err) {
		req.flash("error", `Error! ${err}`);
		return res.redirect("back");
	}
};
