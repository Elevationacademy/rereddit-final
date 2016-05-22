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

//get users
router.get('/users', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

router.post('/posts', auth, function(req, res, next) {
  var post = new Post(req.body);

  console.log(req.user);

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

//param for find the specific user to add friends to it
router.param('user', function(req, res, next, id) {
  var query = User.findById(id);

  query.exec(function (err, user){
    if (err) { return next(err); }
    if (!user) { return next(new Error('can\'t find user')); }

    req.user = user;
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

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

//post friends
router.put('/users/:user/', function(req, res, next) {
  friendId = "573d6dba0c7cd64911441c29"; //tali
  id = req.user.id; //molly
  tali =  {
    "_id": "573d6dba0c7cd64911441c29",
    "hash": "654f890846aca2472802169e0a86d981f1ae7c41570105c232658cd41990bb68251a38c55aba18e5c55bb9d67697bdf6ae6bf6a780e81cea22e860f242613fdb",
    "salt": "8c2cab8f7bfe138f94b77b1c0291e55a",
    "username": "tali",
    "__v": 0,
    "friends": []
  };
  console.log("Actual user:" +req.user);

  
  req.user.friends.push(tali);
  tali.friends.push(req.user);


  // tali.save(function(err, user){
  //   res.json(req.user);
  // });



});




router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

//populate user with friends 
router.get('/users/:user', function(req, res, next) {
  req.user.populate('friends', function(err, user) {
    if (err) { return next(err); }

    res.json(user);
  });
});

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote();


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

module.exports = router;