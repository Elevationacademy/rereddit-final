var express = require('express');
var router = express.Router();

var User = require('../models/Users');

router.param('user', function(req, res, next, id) {
  console.log("hi");
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find comment')); }

    req.user = user;
    return next();
  });
});

router.put('/:user/addfriend', function(req, res, next) {
  friend = req.body.friend;
  if(!friend){
    
    req.user.friends.push(friend);

    req.user.save(function(err, user) {
      res.json(user);
    });
  } else {
    return res.status(400).json({message: 'User is already a friend!'});
  }

  });

module.exports = router;