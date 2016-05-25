var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({secret: 'myLittleSecret'});

var User = require('../models/Users');

//find all users
router.get('/getAll', function (req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);

    res.send(users);
  });
});

router.param('id', function (req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user) {
    if (err) { return next(err); }
    else if (!user) { return next(new Error('can\'t find user')); }

    req.currentUser = user;
    return next();
  });
});

router.get('/user/:id', function (req, res, next) {
  // returning spacific fields
  req.currentUser.populate({path: 'friends', select: '-hash -salt'}, function (err, user) {
    res.send(user);
  });
});

router.post('/:id/reqFriendship', function (req, res, next) {
  req.currentUser.sentReq = req.currentUser.sentReq || [];

  req.currentUser.sentReq.push(req.body.id);

  req.currentUser.save(function (err, currentUser) {
    if (err) return next(err);

    User.findById(req.body.id, function (err, user) {
      if (err) return next(err);

      user.requests = user.requests || [];

      user.requests.sentReq.push(req.currentUser.id);

      user.save(function (err, user) {
        if (err) return next(err);

        res.send(user);
      });
    })
  })

});

router.post('/:id/friendship', function (req, res, next) {
  if (req.body.confirm) {
    //push new friend to friends
    req.currentUser.friends.push(req.body.id);
  }
  
  //index inside the sentReq to remove from arr
  var idx = req.currentUser.requests.indexOf(req.body.id);
  req.currentUser.requests.splice(idx, 1);

  //saving the new friend to db
  req.currentUser.save(function (err, user) {
    if (err) {return next(err);}
    //because friend were added to current user, here
    //also need to add to the frind a current user as a friend
    User.findById(req.body.id, function (err, user) {
      if (err) {return next(err);}
      //adding to array of friends to the friend of current user
      if (req.body.confirm) {
        user.friends.push(req.currentUser.id);
      }
      // remove friend from sentReq
      idx = user.sentReq.indexOf(req.currentUser.id);
      user.sentReq.splice(idx, 1);

      //saving the current user as new friend
      user.save(function (err, user) {
        if (err) {return next(err);}
        //ending the response, no need to send something
        res.end();
      });
    });
  });
});

router.get('/:id/getFriends', function (req, res, next) {
  //sending info of what was found
  res.send(req.currentUser.friends);
});

//remove a friend, almost the same as adding one
//remove from each other
router.put('/:id/removeFriend', auth, function (req, res, next) {

  var idx = req.currentUser.friends.indexOf(req.body.id);
  req.currentUser.friends.splice(idx, 1);

  req.currentUser.save(function (err, user) {
    if (err) return next(err);

    User.findById(req.body.id, function (err, user) {
      if (err) return next(err);

      idx = user.friends.indexOf(req.currentUser.id);
      user.friends.splice(idx, 1);

      user.save(function (err, user) {
        if (err) return next(err);

        res.send(user);
      })
    });
  });
});

module.exports = router;
