app.controller('UsersCtrl', ['$scope', 'users', 'auth', function($scope, users, auth) {
  // users.getAll();
  $scope.users = users.users;
  $currentUser = auth.currentUser();

  $scope.addFriend = function (friend) {
   users.addFriend($currentUser, friend);

  };

  $scope.removeFriend = function () {
    console.log("remove");
  };

  $scope.isFriend = function (user) {
    for (var i = 0; i < $currentUser.friends.length; i++) {
      if (user._id === $currentUser.friends[i]) {
        // $scope.users[$index]._id is the friend that we're comparing to the currentUser's friends array to verify if it's a friend already.
        return true
      } else {
        return false
      }
    }
    // console.log($currentUser._id);
    // console.log($currentUser.friends); // Loop through
  };

}]);