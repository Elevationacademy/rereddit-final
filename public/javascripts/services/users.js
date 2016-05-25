app.factory('users', ['$http', function($http) {
  var userService = {
    users: [],

    getAll: function() {
      return $http.get('/allusers').then(function(data) {
  
        angular.copy(data.data, userService.users);
      });
    },


    addFriend: function(clickedUserId, currentUserId) {
      return $http.put('/allusers/' + clickedUserId + '/friend/' + currentUserId, null).success(
        function(data){
          console.log('data', data);
        });
    },

    removeFriend: function(clickUserId, currentUserId) {
      return $http.delete('/allusers/' + clickedUserId + '/friend/' + currentUserId, null).success(
        function(data){
          console.log('data', data);
        });
    }


  };

  return userService;
}]);