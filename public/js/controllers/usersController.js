app.controller('UsersCtrl', ['$scope', 'usersServ', 'auth', function ($scope, usersServ, auth) {
  $scope.user = usersServ.user;
  $scope.users = usersServ.users;
  $scope.currentUser = auth.currentUser();
  $scope.friends = usersServ.friends;
  $scope.requests = usersServ.requests;
  $scope.pending = false;

  $scope.isFriend = function (id) {
    for (let i = 0; i < $scope.friends.length; i++) {
      if ($scope.friends[i] === id) {
        return true;
      }
    }

    return false;
  }

  $scope.isCurrentUser = function (id) {
    // let ans = false;
    return $scope.currentUser._id === id ? true : false;
  }

  $scope.addReqForFriend = function (id) {
    $scope.pending = true;
    console.log(id);
    usersServ.addReqFriend($scope.currentUser._id, id);
  }

  $scope.removeFriend = function (id) {
    usersServ.removeFriend($scope.currentUser._id, id);
  }

  $scope.reqConfirm = function (id, result) {
    usersServ.addFriend($scope.currentUser._id, id, result);
  }
}]);
