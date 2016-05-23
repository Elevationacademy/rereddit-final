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
        var friend1 = {friend: friend._id};


        return $http.put('/users/' + currentUser._id +'/addfriend', friend1).success(function(data){

        });

            // for (var i = 0; usersService.users.length; i++) {
            //     if (usersService.users[i]._id === result.data._id){
            //         angular.extend(usersService.users[i], result.data)
            //         console.log(usersService.users[i]);
            //         return

            //     } else {
            //         console.log("Fuck You"+[i]);
            //     }
            // }
            // $scope.isFriend();

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