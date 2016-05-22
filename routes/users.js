var express = require('express');
var router = express.Router();

var User = require('../models/Users');

router.param('user', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find comment')); }

    req.user = user;
    return next();
  });
});

router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }
    res.json(users);
  });
});

router.put('/:user/addfriend', function(req, res, next) {
  friend = req.body.friend;
  // if(!friend){
    // req.user.friends.push(friend);

    // req.user.save(function(err, user) {
    //   res.json(user);
    // });

      var newFriend = User.findById(friend, function (err, newfriend) {
          req.user.friends.push(friend);

          newfriend.friends.push(req.user._id);

          console.log(newfriend.friends);

      req.user.save(function(err, user) {
        res.json(user);
      });

      newfriend.save(function(err, newfriend) {
        res.end();
      });


    });
  // } 
  // else {
  //   return res.status(400).json({message: 'User is already a friend!'});
  // }
});

module.exports = router;