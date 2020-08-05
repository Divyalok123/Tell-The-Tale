const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.likestoggler = async function (req, res) {
	try {
		//route-> likes/toggle/id=""&type=""
		let likeable;
        let liked = false;

        console.log('req.query: ', req.query);
        console.log('req.query.type: ', req.query.type);
        console.log('req.query.id: ', req.query.id);

		if (req.query.type == "Post")
			likeable = await Post.findById(req.query.id, function (err) {
				console.log("Error while finding post: ", err);
			}).populate("likes");
		else
			likeable = await Comment.findById(req.query.id, function (err) {
				console.log("Error while finding comment: ", err);
			}).populate("likes");

		console.log("likeable: ", likeable);

		let doeslikeexits = await Like.findOne({
			user: req.user.id,
			likeable: req.query.id,
			onModel: req.query.type,
		});

		console.log("doeslikeexits: ", doeslikeexits);

		if (doeslikeexits) {
			likeable.likes.pull(doeslikeexits._id);
			likeable.save();
			doeslikeexits.remove();
			liked = false;
		} else {
			let newlike = await Like.create({
				user: req.user.id,
				likeable: req.query.id,
				onModel: req.query.type,
			});
			likeable.likes.push(newlike._id);
			likeable.save();
			liked = true; //in doubt for now
		}

		return res.status(200).json({
			message: "Like successfully created/destroyed",
			data: {
				liked: liked,
			},
		});
	} catch (err) {
		console.log("Error while toggling: ", err);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
};
