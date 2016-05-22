app.factory('users', ['$http', '$window', function ($http, $window) {
  var users = [];

  users.getAll = function () {
    return $http.get('/users').then(function(data) {
      angular.copy(data.data, users);
    });
  };
  return users;

   // users.addFriend = function (currentUser, user2Add) {
   //   // return $http.put('/users/' + currentUser._id, userToAdd);
   //   return $http.put('/users/' + currentUser._id + '/friends/' + user2Add._id);
   // };
  
}]);




