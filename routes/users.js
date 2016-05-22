var express = require('express');
var router = express.Router();
var User = require('../models/Users');

router.post('/:id/addFriend', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {return next(err);}

    user.friends.push(req.body.id);

    user.save(function (err, user) {
      if (err) {return next(err);}

      User.findById(req.body.id, function (err, user) {
        if (err) {return next(err);}

        user.friends.push(req.params.id);

        user.save(function (err, user) {
          if (err) {return next(err);}

          res.end();
        });
      });
    });
  });
});

router.get('/:id/getFriends', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);

    res.send(user.friends);
  })
});

router.get('/getAll', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);

    res.send(users);
  });
});

router.put('/:id/removeFriend', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);

    var idx = user.friends.indexOf(req.body.id);
    user.friends.splice(idx, 1);

    user.save(function (err, user) {
      if (err) return next(err);
      
      User.findById(req.body.id, function (err, user) {
        if (err) return next(err);

        idx = user.friends.indexOf(req.params.id);
        user.friends.splice(idx, 1);

        user.save(function (err, user) {
          if (err) return next(err);

          res.send(user);
        })
      });
    });
  });
});

module.exports = router;
