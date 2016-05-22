var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;


var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  friends: [{type: Schema.ObjectId, ref: 'User'}],
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    friends: this.friends,
    exp: parseInt(exp.getTime() / 1000),
  }, 'myLittleSecret');
};




// UserSchema.methods.addFriend = function() {
//  // this.friends.push("test"); 
//  console.log('hola', );
// }

var User = mongoose.model('User', UserSchema);

module.exports = User;