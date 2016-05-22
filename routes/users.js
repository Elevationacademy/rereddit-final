var express = require('express');
var router = express.Router();
var User = require('../models/Users');

router.post('/:id/addFriend', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {return next(err);}

    user.friends.push(req.body.id);
    console.log(user);
    console.log(req.body);

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

module.exports = router;
