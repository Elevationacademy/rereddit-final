app.controller('UsersCtrl', ['$scope', 'users', 'auth', function($scope, users, auth) {
  // users.getAll();
  $scope.users = users.users;
  $scope.currentUsername = auth.currentUser().username;

  for (var i=0; i<$scope.users.length; i++) {
    if ($scope.currentUsername === $scope.users[i].username) {
      $scope.currentUser = $scope.users[i];
    }
  }

  console.log($scope.currentUser);



  $scope.addFriend = function (friend) {
   users.addFriend($scope.currentUser, friend).then(function(result){
            $scope.currentUser.friends.push(friend._id);
            friend.friends.push($scope.currentUser._id);  
          });   
   console.log("add"); 
   console.log($scope.users); 

  };

  $scope.removeFriend = function (friend, $index) {
    users.deleteFriend($scope.currentUser, friend).then(function(result){
      var user = $scope.currentUser;
      var indexUser = user.friends.indexOf(friend._id);
      
      user.friends.splice(indexUser,1);
      
      var indexFriend = friend.friends.indexOf(user._id);
      
      friend.friends.splice(indexFriend,1);
      console.log("remove"); 
      console.log($scope.users); 
    });
  };

  $scope.isFriend = function (user) {
    for (var i = 0; i < $scope.currentUser.friends.length; i++) {
      if (user._id === $scope.currentUser.friends[i]) {

        return true
      } 
    }
  };

}]);