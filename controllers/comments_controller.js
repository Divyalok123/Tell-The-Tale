const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment-mail-worker');
const Like = require('../models/like');

module.exports.create = async function (req, res) {
	try {
		let post = await Post.findById(req.body.post_id);

		if (post) {
			let comment = await Comment.create({
				content: req.body.content,
				post: req.body.post_id,
				user: req.user._id,
			});

			post.comments.push(comment);
			post.save();
			comment = await comment.populate('user', 'name email').execPopulate();
			console.log("From comments_controller, comment: ", comment);
			// commentsMailer.newComment(comment); // -> passing the comment to comment_mailer
			/* ↑ this neeeds to go to the kue as when a lot of tasks are there kue should handle it properly */

			/* //turning off email functionality for now
			let job = queue.create('emails', comment).save(function(err){
				if(err) {
					console.log('Error in creating comment queue: ', err);
					return;
				}

				console.log('Job id: ', job.id);
			});
			*/

			if (req.xhr) {
				//populating comment with a particular key (user)
				//we need to use execPopulate for existing document
				// comment = await comment.populate("user", "name").execPopulate();
				return res.status(200).json({
					data: {
						comment: comment,
					},
					message: "Comment created!",
				});
			}

			req.flash("success", "Comment added!");
			return res.redirect("back");
		}
	} catch (err) {
		req.flash("error", "Error posting comment!");
		console.log("Error occured while creating comment: ", err);
		return;
	}
};

module.exports.destroy = async function (req, res) {
	try {
		let comment = await Comment.findById(req.params.id);

		if (comment.user == req.user.id) {
			//before deleting a comment we need to get the post id of the comment
			//and then find the comment in the post and delete from there too
			let postid = comment.post;
			comment.remove();
			//pull this comment id from comments in found post and delete it (updating the post)
			let post = await Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } }); /* $pull is mongodb syntax */
			//we will be deleting the like associated to this comment too
			await Like.deleteMany({onModel: 'Comment', likeable: comment._id});

			if(req.xhr) {
				return res.status(200).json({
					data: {
						comment_id: req.params.id
					},
					message: "Comment deleted!"
				});
			}

			req.flash("success", "Comment deleted!");
		} else {
			req.flash("error", "Unauthorized");
		}
		return res.redirect("back");
	} catch (err) {
		req.flash("error", "Error deleting comment!");
		console.log("Error Occured while destroying comment: ", err);
		return;
	}
};
