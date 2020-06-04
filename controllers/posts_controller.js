const Post=require('../models/post');
const Comment=require('../models/comment');
const Like = require('../models/like');

module.exports.create= async function(req,res){
    try{
        let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
    
            
               
        return res.status(200).json({
                    data:{
                        post:post               
                    },
                    message:"Post Created !"
                });
         

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}
 
module.exports.destroy= async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
            
        // .id means converting object id into string
        if(post.user==req.user.id){

            //when we delete post all the things associated with it like and comments also will 
            //be deleted
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.Comments}});


            post.remove();

            await Comment.deleteMany({ post:req.params.id});

            // if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'Post deleted'
                });
            // }
            
            req.flash('success','Post and associated comments deleted !');
            
            return res.redirect('back');
        }else{
            req.flash('error','You can not delete t');
            return res.redirect('back');

        }

    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }

    }

    



