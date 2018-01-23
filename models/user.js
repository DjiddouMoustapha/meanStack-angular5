var mongoose =require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;
var userShema = new Schema({
    
    
     name: {
     	type : String
     },
      email: {
     	type : String,
     	require: true
     },
       username: {
     	type : String,
     	require: true
     },
       password: {
     	type : String,
     	require: true
     },
     
});

module.exports.sayHelloInEnglish = function() {
  return "hello";
};

module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        // Store hash in your password DB. 
        if(err) throw err;
        newUser.password= hash;
        newUser.save(callback);
    });
}); 

};


userShema.methods.getUserByUsername= function(username, callback){
	var query = {username: username}
	User.findOne(query,callback);
};


userShema.methods.ComparePassword = function(candidatePassword, hash, cb) {
    var user = this;
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        console.log(candidatePassword);
        console.log(user.password);
        console.log((candidatePassword === user.password) ? 'passwords match' : 'passwords dont match' );
        return;
        if (err) return cb(null, err);
            cb(null, isMatch);
    });
};

const Users = module.exports = mongoose.model('User', userShema);