var express = require('express');
var router = express.Router()
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var auth = jwt({secret: 'myLittleSecret'});
var passport = require('passport');

require('../config/passport');

var Post = require('../models/Posts');
var Comment = require('../models/Comments');
var User = require('../models/Users');

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);

  console.log(req.user, req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
}); 

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

router.param('currentUser', function (req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.currentUser = user;
    return next();
  });
});

router.param('user2', function (req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user2 = user;
    return next();
  });
});


router.post('/posts/:post/comments', auth, function(req, res, next) {
  console.log(req.post, req.body, req.params);
  var comment = new Comment(req.body);
  comment.post = req.post; //req has post from the post id param

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

// router.get('/users/:currentUser', function (req, res, next) {
//   req.currentUser.populate('users', function (err, user) {
//     if(err) { return next(err); }

//     res.json(user);
//   });
// });

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote();

  console.log(req.params);
  req.post.save(function(err, post) {
    res.json(post);
  });
});

router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote();

  req.comment.save(function(err, comment) {
    res.json(comment);
  });
});

router.put('/users/:currentUser/add/:user2/', function (req, res, next) {
  // req.params
  // console.log('1');
  req.currentUser.requests.push(req.params.user2); 
  req.user2.toConfirm.push(req.params.currentUser);
  // req.currentUser.friends.push(req.params.user2);
  // req.user2.friends.push(req.params.currentUser);

  req.currentUser.save();
    // res.json(user);

  req.user2.save();
  // console.log(req.params, req.currentUser, req.user2);
    // res.json(user);
  res.end();
});

router.put('/users/:currentUser/confirm/:user2/', function (req, res, next) {
  // console.log(req.currentUser, req.user2);
  // req.currentUser.requests.push(req.params.user2); 
  // req.user2.toConfirm.push(req.params.currentUser);
  req.currentUser.toConfirm.splice(req.currentUser.toConfirm.indexOf(req.params.user2), 1);
  req.currentUser.friends.push(req.params.user2);
  req.user2.requests.splice(req.user2.requests.indexOf(req.params.currentUser), 1);
  req.user2.friends.push(req.params.currentUser);


  req.currentUser.save();
    // res.json(user);

  req.user2.save();
  // console.log(req.params, req.currentUser, req.user2);
    // res.json(user);
  res.end();
});

router.put('/users/:currentUser/cancel/:user2/', function (req, res, next) {
  req.currentUser.requests.splice(req.currentUser.requests.indexOf(req.params.user2), 1);
  req.user2.toConfirm.splice(req.user2.toConfirm.indexOf(req.params.currentUser), 1);
  req.currentUser.save();
    // res.json(user);

  req.user2.save();
  // console.log(req.params, req.currentUser, req.user2);
    // res.json(user);
  res.end();  
});

router.put('/users/:currentUser/ignore/:user2/', function (req, res, next) {
  req.currentUser.toConfirm.splice(req.currentUser.toConfirm.indexOf(req.params.user2), 1);
  req.user2.requests.splice(req.user2.requests.indexOf(req.params.currentUser), 1);
  req.currentUser.save();
    // res.json(user);

  req.user2.save();
  // console.log(req.params, req.currentUser, req.user2);
    // res.json(user);
  res.end();  
});

router.put('/users/:currentUser/remove/:user2/', function (req, res, next) {
  req.currentUser.friends.splice(req.currentUser.friends.indexOf(req.params.user2),1);
  req.user2.friends.splice(req.user2.friends.indexOf(req.params.currentUser),1);

  req.currentUser.save();
  req.user2.save();

  res.end();
});

router.get('/users', function (req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });  
});

module.exports = router;
