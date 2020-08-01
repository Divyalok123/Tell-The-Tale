//similar to /js/home_post.js
//we will get the idPost (id of the post) from home_post.js
function ajax_comment(idPost) {
	let createComment = function () {
		let commentForm = $(`#comment-${idPost}-form`);

		commentForm.submit(function (e) {
			e.preventDefault();
			$.ajax({
				type: "post",
				url: "/comments/create",
				data: commentForm.serialize(),
				success: function (data) {
                    let newCommentWithData = commentDOM(data.data.comment);
					$(`#comments-post-${idPost}`).prepend(newCommentWithData);
					deleteComment($(' .delete-comment-button', newCommentWithData));

					new Noty({
						theme: "sunset",
						text: "Comment added to the post!",
						type: "success",
						layout: "topRight",
						timeout: 1000,
					}).show();
				},
				error: function (err) {
					console.log(err.responseText);
					new Noty({
						theme: "sunset",
						text: "Error occured while posting comment!",
						type: "alert",
						layout: "topRight",
						timeout: 1000,
					}).show();
				},
			});
		});
	};

	let commentDOM = function (comment) {
		return $(
			`<li id="comment-${comment._id}">
                    <p>
                        <small>
                            <a class="delete-comment-button" href="/comments/destroy/${comment._id}">x</a>
                        </small>
                            ${comment.content}
                        <br>
                        <small>
                            ${comment.user.name}
                        </small>
                    </p>
                </li>`,
		);
	};

	let deleteComment = function(deleteCommentLink) {
		$(deleteCommentLink).click(function (e) {
			e.preventDefault();

			$.ajax({
				type: "get",
				url: $(deleteCommentLink).prop("href"),
				success: function (data) {
					$(`#comment-${data.data.comment_id}`).remove();
					new Noty({
						theme: "sunset",
						text: "Comment Deleted!",
						type: "error",
						layout: "topRight",
						timeout: 1100,
					}).show();
				},
				error: function (err) {
					console.log(err);
					console.log(err.responseText);
					new Noty({
						theme: "sunset",
						text: "Error occured while deleting comment",
						type: "alert",
						layout: "topRight",
						timeout: 1100,
					}).show();
				},
			});
		});
	}

	function applyDeleteToAllComments() {
		let allcomments = $(`#comments-post-${idPost} > li`);
		for(let singleComment of allcomments) {
			deleteComment($('.delete-comment-button', singleComment));
		}
    }

	createComment();
	applyDeleteToAllComments();
}


