app.controller('UsersCtrl', ['$scope', '$state', 'users', 'auth', function ($scope, $state, users, auth) {
  $scope.users = users;
  console.log($scope.users);
  $scope.currentUser = auth.currentUser();
  console.log($scope.currentUser);
  $scope.currentUsername = $scope.currentUser.username;
  $scope.addOrRemove = function (user) {
    for (var i = 0; i < $scope.currentUser.friends.length; i++) {
      console.log(user._id, $scope.currentUser.friends[i]);
      if (user._id === $scope.currentUser.friends[i]) {return true;}
    }

  };
}]);