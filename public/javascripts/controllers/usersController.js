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
            console.log($scope.currentUser.friends);   
          });   

  };

  $scope.removeFriend = function () {
    console.log("remove");
  };

  $scope.isFriend = function (user) {
    for (var i = 0; i < $scope.currentUser.friends.length; i++) {
      if (user._id === $scope.currentUser.friends[i]) {
        // $scope.users[$index]._id is the friend that we're comparing to the currentUser's friends array to verify if it's a friend already.
        return true
      } 
      return false
    }
    // console.log($currentUser._id);
    // console.log($currentUser.friends); // Loop through
  };

}]);