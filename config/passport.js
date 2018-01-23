var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config/db');
//var passport =require('passport');


module.exports = function(passport){
    console.log('hellooooooo :)');

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = config.secret;
//opts.issuer = "accounts.examplesoft.com";
//opts.audience = "yoursite.net";
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload._doc._id);
    console.log(User);
    User.findOne({_id: jwt_payload._doc._id}, (err, user) =>{
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account 
        }
    }
    );
}));
console.log('hellooooooo2 :)');
}