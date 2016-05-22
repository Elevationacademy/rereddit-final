app.controller('UsersCtrl', ['$scope', 'users', 'auth', function($scope, users, auth) {
  // users.getAll();
  $scope.users = users.users;

  $scope.addFriend = function () {
    // TODO
  };

  $scope.removeFriend = function () {
    // TODO
  };

  $scope.isFriend = function () {

  };

}]);