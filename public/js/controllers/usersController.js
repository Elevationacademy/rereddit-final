app.controller('UsersCtrl', ['$scope', 'usersServ', 'auth', function ($scope, usersServ, auth) {
  $scope.users = usersServ.users;
  $scope.currentUser = auth.currentUser();
  console.log($scope.currentUser);
  console.log($scope.currentUser.friends);

  $scope.isFriend = function (id) {
    for (let i = 0; i < $scope.currentUser.friends.length; i++) {
      if ($scope.currentUser.friends[i] === id) {
        return true;
      }
    }

    return false;
  }
}])
