var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var actorShema = new Schema({
    
    
     firstName: String,
     lastName: String,
     age: String,
     
});

module.exports = mongoose.model('actor',actorShema);