const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.likestoggler = async function (req, res) {
	try {
		//route-> likes/toggle/id=""&type=""
		let likeable;
        let previouslyLiked = false;

		console.log('req.query: ', req.query);

		if (req.query.type == 'Post')
			likeable = await Post.findById(req.query.id).populate("likes");
		else
			likeable = await Comment.findById(req.query.id).populate("likes");

		// console.log("likeable: ", likeable);

		let doeslikeexits = await Like.findOne({
			user: req.user._id,
			likeable: req.query.id,
			onModel: req.query.type,
		});

		// console.log("doeslikeexits: ", doeslikeexits);

		if (doeslikeexits) {
			likeable.likes.pull(doeslikeexits._id);
			likeable.save();
			doeslikeexits.remove();
			previouslyLiked = true;
		} else {
			let newlike = await Like.create({
				user: req.user._id,
				likeable: req.query.id,
				onModel: req.query.type,
			});
			// console.log(newlike);
			likeable.likes.push(newlike._id);
			likeable.save();
		}

		return res.status(200).json({
			message: "Like successfully created/destroyed",
			data: {
				previouslyLiked: previouslyLiked,
			},
		});
	} catch (err) {
		console.log("Error while toggling: ", err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
