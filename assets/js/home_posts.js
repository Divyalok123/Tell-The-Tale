{
	//while creating a post
	//we need two function one which sends the data and one who receives it

	//method to submit the form data for a new post using AJAX
    //a function which sends the data to the controller action

	let createPost = function () {
		let newPostForm = $("#post-form");
		//preventing the default behaviour
		newPostForm.submit(function (e) {
			e.preventDefault();

			$.ajax({
				type: "post",
				url: "/posts/create",
				data: newPostForm.serialize(), //convert the form data into JSON
				success: function (data) {
					let newPost = newPostDom(data.data.post);
					$("#posts-list-container").prepend(newPost);
                    deletePost($(" .delete-post-button", newPost)); //delete-post-button inside newPost to delete a post
                    
                    new ajax_comment(data.data.post._id);

                    new Noty({
						theme: "sunset",
						text: "Post created!",
						type: "success",
						layout: "topRight",
						timeout: 1000
                    }).show();
				},
				error: function (error) {
					console.log(error.responseText);
					new Noty({
						theme: "sunset",
						text: "Error!: " + error.responseText,
						type: "alert",
						layout: "topRight",
						timeout: 1100
					}).show();
				},
			});
		});
	};

	//method to create a post in the DOM
	//a function which recieves the data and appends the post to the database
	let newPostDom = function (post) {
		return $(`
        <li id="post-${post._id}">
            <p>
                <small>
                    <a class='delete-post-button' href="/posts/destroy/${post._id}">x</a> 
                </small>
                    ${post.content}
                <br>
                <small>
                    ${post.user.name}
                </small>
            </p>
            <div class="post-comments">
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Comment goes here..." required>
                    <input type="hidden" name="post_id" value="${post._id}"> <!--Hidden-->
                    <input type="submit" value="Add Comment">
                </form>
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                    </ul>
                </div>
            </div>
        </li>`);
	};

	//method to delete a post
	let deletePost = function (deletelink) {
		$(deletelink).click(function (e) {
			//preventing default behaviour
			e.preventDefault();

			$.ajax({
				type: "get",
				url: $(deletelink).prop("href"),
				success: function (data) {
					$(`#post-${data.data.post_user_id}`).remove();
					new Noty({
						theme: "sunset",
						text: "Post deleted!",
						type: "error",
						layout: "topRight",
						timeout: 1000
					}).show();
				},
				error: function (error) {
					console.log(error.responseText);
					new Noty({
						theme: "sunset",
						text: "Error!: " + error.responseText,
						type: "alert",
						layout: "topRight",
						timeout: 1100
					}).show();
				}
			});
		});
    };

    //function to apply delete to every post
    function applyDeleteToAllPosts() {
        //getting all the posts
        let allposts = $('#posts-list-container>li');
        //looping through the posts
        for(let everysinglepost of allposts) {
            //applying delete to every post
            deletePost($(" .delete-post-button",everysinglepost));
        }
    }

    createPost();
    applyDeleteToAllPosts();
}
