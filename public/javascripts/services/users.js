app.factory('users', ['$http', 'auth', function($http, auth) {
  var usersService = {
    users: [],


    getAll: function() {
      console.log('get all');
      return $http.get('/users').then(function(data) {
        angular.copy(data.data, usersService.users);
      });
    },

    addFriend: function(currentUser, friend){
        var friend = {friend: friend._id};


        return $http.put('/users/' + currentUser._id +'/addfriend', friend).success(function(data){

        });
    },

    deleteFriend: function(currentUser, friend){
        var friend = {friend:friend._id};
        return $http.put('/users/' + currentUser._id +'/deletefriend', friend).success(function(data){

        });
        

    }

    // get: function(id) {
    //   return $http.get('/users/' + id).then(function(res){
    //     return res.data;
    //   });
    // },

    // create: function(post) {
    //   return $http.post('/posts', post, {
    //     headers: {Authorization: 'Bearer '+ auth.getToken()}
    //   }).success(function(data){
    //     postService.posts.push(data);
    //   });
    // }

    // upvote: function(post) {
    //   return $http.put('/posts/' + post._id + '/upvote', null).success(function(data){
    //     post.upvotes += 1;
    //   });
    // },

    // addComment: function(id, comment) {
    //   return $http.post('/posts/' + id + '/comments', comment);
    // },

    // upvoteComment: function(post, comment) {
    //   return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null).success(function(data){
    //     comment.upvotes += 1;
    //   });
    // }
  };
  
  return usersService;
}]);