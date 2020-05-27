const passport = require('passport');
const JWTStrategy= require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt;

const User =require('../models/user');

let opts={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'codeial'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    User.findById(jwtPayLoad._id , function(err,user){
        if(err){
            console.log('Error in finding the user in JWT',err);
            return;
        }

        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);   //   5eb411919c219b7a9c62f8d3
        }
    })
}));

module.exports=passport;