app.factory('users', ['$http', '$window', function ($http, $window) {
  var users = [];

  users.getAll = function () {
    return $http.get('/users').then(function(data) {
      angular.copy(data.data, users);
    });
  };

   users.addFriend = function (currentUser, friend2Add) {
     // return $http.put('/users/' + currentUser._id, userToAdd);
     return $http.put('/users/' + currentUser._id + '/friends/' + friend2Add._id).success(function(data) {
        // currentUser.friends.push(friend2Add._id);
        // console.log(currentUser);
        // friend2Add.friends.push(currentUser._id);
        // console.log(friend2Add);
     });
   };

   users.removeFriend = function (currentUser, friend2Remove) {
    return $http.put('/users/' + currentUser._id + '/remove/' + friend2Remove._id).success(function(data){

    });
   };
  return users;
  
}]);




