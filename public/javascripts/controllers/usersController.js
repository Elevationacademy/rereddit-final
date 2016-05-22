app.controller('UsersCtrl', ['$scope', '$state', 'users', 'auth', function ($scope, $state, users, auth) {
  $scope.users = users;
  console.log($scope.users);
  // $scope.currentUser = auth.currentUser();
  // console.log($scope.currentUser);
  // $scope.currentUsername = $scope.currentUser.username;

  $scope.currentUsername = auth.currentUser().username;
  for (var i=0; i<$scope.users.length; i++) {
    if ($scope.currentUsername === $scope.users[i].username) {
      $scope.currentUser = $scope.users[i];
      console.log($scope.currentUser);
    }
  }

  $scope.addOrRemove = function (user) {
    for (var i = 0; i < $scope.currentUser.friends.length; i++) {
      // console.log(user._id);
       // console.log($scope.currentUser.friends[i]);
      if (user._id === $scope.currentUser.friends[i]) {
        return true;
      }
    }
  };
  $scope.addFriend = function (user) {
    users.addFriend($scope.currentUser, user).then(function() {
      $scope.currentUser.friends.push(user._id);
      user.friends.push($scope.currentUser._id);
    });
  };

  $scope.removeFriend = function (user) {
    // console.log('1');
    users.removeFriend($scope.currentUser, user).then(function () {
      $scope.currentUser.friends.splice($scope.currentUser.friends.indexOf(user._id),1);
      user.friends.splice(user.friends.indexOf($scope.currentUser._id),1);
    });
  };
}]);