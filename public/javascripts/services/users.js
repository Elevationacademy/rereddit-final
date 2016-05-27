app.factory('users', ['$http', '$window', function ($http, $window) {
  var users = [];

  users.getAll = function () {
    return $http.get('/users').then(function(data) {
      angular.copy(data.data, users);
    });
  };

  // users.get = function (id) {
  //   // console.log('1');
  //   return $http.get('/users/' + id).then(function(res){
  //     return res.data;
  //   });
  // };

   users.addFriend = function (currentUser, friend2Add) {
     // return $http.put('/users/' + currentUser._id, userToAdd);
     return $http.put('/users/' + currentUser._id + '/add/' + friend2Add._id).success(function(data) {
        // currentUser.friends.push(friend2Add._id);
        // console.log(currentUser);
        // friend2Add.friends.push(currentUser._id);
        // console.log(friend2Add);
     });
   };

   users.confirmFriend = function (currentUser, friend2Confirm) {
    return $http.put('/users/' + currentUser._id + '/confirm/' + friend2Confirm._id).success(function(data) {

    });
   };

   users.cancelRequest = function (currentUser, cancelUser) {
    return $http.put('/users/' + currentUser._id + '/cancel/' + cancelUser._id).success(function(data) {    
    
    });
   };

   users.ignoreRequest = function (currentUser, ignoreUser) {
    return $http.put('/users/' + currentUser._id + '/ignore/' + ignoreUser._id).success(function(data) {    
    
    });
   };

   users.removeFriend = function (currentUser, friend2Remove) {
    return $http.put('/users/' + currentUser._id + '/remove/' + friend2Remove._id).success(function(data){

    });
   };
  return users;
  
}]);




