const passport = require('passport');
const googleStrategy= require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
  clientID :"274249332887-flip6kcs1jrhjr296piusukprsck1vca.apps.googleusercontent.com",
  clientSecret:"YXTdS-gcTOq83_5TqI52ZTjE",
  callbackURL:"http://localhost:8000/users/auth/google/callback"
},

// passport.use(new googleStrategy({
//   clientID:"393078678897-kkdu583qc103jel42fca8o6jmp9d0411.apps.googleusercontent.com",
//   clientSecret:"8kMsBwFB6TLbgR436IxIjKKf",
//   callbackURL:"http://localhost:8000/users/auth/google/callback"

// },

function(accessToken,refreshToken,profile,done){
  User.findOne({email:profile.emails[0].value}).exec(function(err,user){
      if(err){console.log('error in google-strategy-passport',err);return;}
      console.log(accessToken,refreshToken);
      console.log(profile);
      if(user){
          //if found set this user as req.user
          return done(null,user);
      }else{
          // if not found ,create the user and set it as req.user
          User.create({
              name:profile.displayName,
              email:profile.emails[0].value,
              password:crypto.randomBytes(20).toString('hex')

          },function(err,user){
              if(err){console.log('error in creating user google-strategy-passport',err);return;}

              return done(null,user);
          });
      }
  });
}
));
module.exports=passport;