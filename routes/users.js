var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'myLittleSecret'});

var User = require('../models/Users');

router.get('/user/:user', function (req, res, next) {
  var userQuery = User.findById(req.params.user);

  userQuery.populate({path: 'friends', select: '-hash -salt'})
  userQuery.exec(function (err, user) {
    if (err) return next(err);

    res.send(user);
  });
});

router.post('/:id/addFriend', auth, function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {return next(err);}
    //adding to current user a friend, only ID
    user.friends.push(req.body.id);

    //saving the new friend to db
    user.save(function (err, user) {
      if (err) {return next(err);}
      //because friend were added to current user, here
      //also need to add to the frind a current user as a friend
      User.findById(req.body.id, function (err, user) {
        if (err) {return next(err);}
        //adding to array of friends to the friend of current user
        user.friends.push(req.params.id);
        //saving the current user as new friend
        user.save(function (err, user) {
          if (err) {return next(err);}
          //ending the response, no need to send something
          res.end();
        });
      });
    });
  });
});

router.get('/:id/getFriends', function (req, res, next) {
  //find a friends by id
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    //sending info of what was found
    res.send(user.friends);
  })
});

//find all users
router.get('/getAll', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);

    res.send(users);
  });
});

//remove a friend, almost the same as adding one
//remove from each other
router.put('/:id/removeFriend', auth, function (req, res, next) {
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
