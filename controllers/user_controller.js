 const User=require('../models/user');
 const fs=require('fs');
 const path = require('path');
 const Friendship=require('../models/friendship')

module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile', {
            title: "User Profile",
            profile_user:user

    });

    });
}

module.exports.update=async function(req,res){

    if(req.user.id=req.params.id){
        try{

            let user= await User.findById(req.params.id);
            User.uploadAvatar(req,res,function(err){
                if(err){
                    console.log('************multer error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){
                        if(fs.existsSync(path.join(__dirname,"..",user.avatar)))
                        {
                            fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
                        }
                        
                    }
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unuthorized');
        return res.status(401).send('Unauthorized');

    }

}



module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'signUp'
    });
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:'signIn'
    });
}



module.exports.create=function(req,res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('error in finding user sign up');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user while sign up');
                    return;
                }
                return res.redirect('/users/sign-In');

            });
        } else{
            return res.redirect('back');
        }
        
                                           
    });
}

// sign in and create session for the user
module.exports.createSession=function(req,res){
    req.flash('success' , 'Logged in Successfully');
    return res.redirect('/');
};


module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success' , 'You have Logged Out');
    return res.redirect('/');
}

module.exports.makeFriendShip=async function(req,res)
{
    try{
        //friends/?from=logged.id&to=jiski_profile._id
        let fromUser=await User.findById(req.query.from);
        let toUser=await User.findById(req.query.to);
        let newFriendshipFrom=await Friendship.findOne({
            fromUser:req.query.from,
            toUser:req.query.to
        });
        let newFriendshipTo=await Friendship.findOne({
            fromUser:req.query.to,
            toUser:req.query.from
        });
        if(!newFriendshipFrom)
        {
            let newFriendshipFrom=await Friendship.create({
                fromUser:req.query.from,
                toUser:req.query.to
            });
            let newFriendshipTo=await Friendship.create({
                fromUser:req.query.to,
                toUser:req.query.from
            });
            fromUser.friendships.push(newFriendshipFrom);
            fromUser.save();
            toUser.friendships.push(newFriendshipTo);
            toUser.save();
        }
        else
        {
            fromUser.friendships.pull(newFriendshipFrom);
            fromUser.save();
            toUser.friendships.pull(newFriendshipTo);
            toUser.save();
            newFriendshipFrom.remove();
            newFriendshipTo.remove();
        }
      
        return res.redirect("back");
    }
    catch(err)
    {
        console.log("error in making friendship ",err);
        return;
    }
}