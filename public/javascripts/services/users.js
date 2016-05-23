app.factory('users', ['$http', 'auth', function($http, auth) {
  var usersService = {
    users: [],


    getAll: function() {
      return $http.get('/users').then(function(data) {
        angular.copy(data.data, usersService.users);
      });
    },

    addFriend: function(currentUser, friend){
        console.log(currentUser._id);
        var friend = {friend: friend._id};
        console.log(friend);


        return $http.put('/users/' + currentUser._id +'/addfriend', friend);

        // .then(function(result){
        //     console.log(result.data);
        //     console.log(result);
        //     return result.data
        // });
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