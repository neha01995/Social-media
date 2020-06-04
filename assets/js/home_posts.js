{   
    // method to submit the form data for new post using Ajax
    let createPost= function(){
        let newPostForm= $("#new-post-form");
        // console.log("hey inside ajax func 1",newPostForm);
        newPostForm.submit(function(e){
            // console.log("hey inside ajax func 2");
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    console.log(data.data);
                    let newPost=newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost)
                    deletePost($(' .delete-post-button,newPost'));

                    new ToggleLike($('.toggle-like-button',newPost));

                    new Noty({
                        theme:'relax',
                        text:"Post Published!",
                        type:"sucess",
                        layout:"topRight",
                        timeout:1800
                    }).show();
                    
                },error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    // method to craete a post in DOM
    let newPostDom=function(post){
                        return $(` <li id="post-${post._id}"> 
                        <p>
        
                            <small>
                                <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                            </small>
                            ${post.content}
                            <br>
                            <small>
                                    ${post.user.name }
                            </small>
                            <br>
                            <small>
                            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id%}&type=Post">
                            0 Likes
                            </a>
                       </small>


                    
                        </p>
                    <div id="post-comments">
                    
                            <form action="/comments/create" id="new-comment-form "method="Post">
                                    <input type="text" name="content" placeholder="Type here to add comments ....">
                                    <input type="hidden" name="post" value="${ post._id }">
                                    <input type="submit" value="Add Comment">
                                
                                </form>
                
                                
                    <div id="post-comment-list">
                    <ul id="post-comments-${ post._id } ">
                       
                    </ul>
                    
                    </div>
                    
                    </div>
                    
                    </li>`)
    }


    // delete the post using ajax
    let deletePost= function(deleteLink){
        $(deleteLink).click( function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                }, error:function(err){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}