var express = require('express');
var router = express.Router();
var User = require('../models/user');
var config= require('../config/db');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.post('/register', function(req, res, next) {



addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        // Store hash in your password DB. 
        if(err) throw err;
        newUser.password= hash;
        newUser.save(callback);
    });
}); 

}

	
 
 let newUser = new User({

 	name : req.body.name,
 	email : req.body.email,
 	username : req.body.username,
 	password : req.body.password

 });

 addUser(newUser, (err,User) => {

	if(err){
		res.json({success : false, msg :"erreur de register"});
	}
	else{
		res.json({success : true, msg :"success to register user"});
	}
});

});

router.post('/authenticate', function(req, res, next) {

	getUserByUsername= function(username, callback){
	var query = {username: username}
	User.findOne(query,callback);
}


ComparePassword = function(candidatePassword, hash, cb) {
    var user = this;
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
       // console.log(candidatePassword+"P1");
      // console.log(hash+"P2");
       // console.log((candidatePassword === hash) ? 'passwords match' : 'passwords dont match' );
      //  return;
        if (err) throw err;
            cb(null, isMatch);
    });
}

//console.log(User);
//Users.sayHelloInEnglish();
const username = req.body.username;
const password = req.body.password;
console.log(username,password);

getUserByUsername(username, function(err, user){
	if(err) throw err;
	if (!user) {
		return res.json({success : false, msg :"user not found"});
	}
ComparePassword(password,user.password, function(err,isMatch){
		if(err) throw err;
		if(isMatch){
			const token = jwt.sign(user,config.secret,{
				expiresIn: 604800
			});
			console.log(res.json+"h1");
			res.json({
				success : true, 
				token : 'JWT '+token, 
				user: {
					id: user._id,
					name: user.name,
					username: user.username,
					email: user.email

				}
			});
		}
		else{
			
			res.json({success : false, msg :"wrong password"});
		}
	});

});


  
});

router.get('/profile', passport.authenticate('jwt', { session: false}), function(req, res, next) {

  res.json({user:req.user});
  
 
});

router.get('/admin', function(req, res, next) {
  User.find().exec(function(err, user){
        if(err){
            res.json({error: err});
        }else{
            res.send(user);
        }
    });
});


module.exports = router;
