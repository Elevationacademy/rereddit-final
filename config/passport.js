var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/Users');

passport.use(new LocalStrategy(
  function(username, password, done) {

    // because of select:false need explicitly add hash and salt to authenticate a user on login
    User.findOne({ username: username }).select('+hash +salt').exec(function (err, user) {
      if (err) { return done(err); }
      else if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      else if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // remove salt and password before sending back information
      user.salt = undefined;
      user.hash = undefined;
      return done(null, user);
    });
  }
));
