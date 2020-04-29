const passport=require('passport');
const User=require('../models/user');

const LocalStrategy=require('passport-local').strategy;

passport.use(new LocalStrategy({ 
    usernameField:'email' 
},
 function(email,password,done ){
     user.findOne({  email:email} ,function(err,user){
         if(err){
             console.log('Error in finding user --> passport');
             return done(err);
         }
         if(!user || user.password !=password){
             console.log('Invalid Username/password');
             return done(null,false);
         }
           return done(null,user);
     });
 }
 
));

// serialize the user
passport.serializeUser(function(user,done){
    done(null, user.id);
});


// deserialize the  user
passport.deserializeUser(function(id,done){

    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding user --> passport');
            return done(err);
        }
        return done(err,user);


    });

 
});

module.exports=passport;