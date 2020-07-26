{
    //while creating a post
    //we need two function one which sends the data and one who receives it
    
    //method to submit the form data for a new post using AJAX
    //a function which sends the data to the controller action
    let createPost = function() {
        let newPostForm = $('#post-form');

        //we don't want the default submission and rather use ajax for sending and posting
        //so we will prevent default
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(), //convert the form data into JSON (content will be the key and value would be the value filled in form)
                success: function(data) {
                    // console.log('printing data', data);
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); //posts-delete-button inside newPost
                },
                error: function(error) {
                    console.log(error.responseText);
                } 
            });
        });
    }

    //method to create a post in the DOM 
    //a function which recieves the data and appends the post to the database
    let newPostDom = function(post) {
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
    </li>`)
    }

    //method to delete a post
    let deletePost = function(deletelink) {
        $(deletelink).click(function(e){
            //preventing default behaviour
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deletelink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error: function(error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}