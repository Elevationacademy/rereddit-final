app.controller('UsersCtrl', ['$scope', '$state', 'users', 'auth', function ($scope, $state, users, auth) {
  if (auth.isLoggedIn()) {
    $scope.users = users;
    // $scope.user = user;
    console.log($scope.users);
    // $state.params.id = $state.params.id + ' '; 
    // console.log(JSON.stringify($state.params.id));
    // $scope.currentUser = auth.currentUser();
    // console.log($scope.currentUser);
    // $scope.currentUsername = $scope.currentUser.username;

    $scope.currentUserId = auth.currentUser()._id;
    for (var i=0; i<$scope.users.length; i++) {
      if ($scope.currentUserId === $scope.users[i]._id) {
        $scope.currentUser = $scope.users[i];
        // console.log($scope.users[i]._id, $state.params.id);
      }
      // console.log($state.params.id, $scope.users[i]._id);
      if ($state.params.id === $scope.users[i]._id) {
        $scope.profileUser = $scope.users[i];
        // console.log($scope.profileUser);
      }
    }
    // console.log($scope.currentUser);
    $scope.friendStatus = function (user) {
      for (var i = 0; i < $scope.currentUser.friends.length; i++) {
        // console.log(user._id);
         // console.log($scope.currentUser.friends[i]);
        if (user._id === $scope.currentUser.friends[i]) {
          return 1;
        } 
      }
      for (i = 0; i < $scope.currentUser.requests.length; i++) {
        if (user._id === $scope.currentUser.requests[i]) {
          return 2;
        }
      }
      for (i = 0; i < $scope.currentUser.toConfirm.length; i++) {
        if (user._id === $scope.currentUser.toConfirm[i]) {
          return 3;
        }
      }
      return -1;
    };
    $scope.addFriend = function (user) {
      users.addFriend($scope.currentUser, user).then(function() {
        $scope.currentUser.requests.push(user._id);
        user.toConfirm.push($scope.currentUser._id);
      });
    };

    $scope.confirmFriend = function (user) {
      users.confirmFriend($scope.currentUser, user).then(function() {
        $scope.currentUser.toConfirm.splice($scope.currentUser.toConfirm.indexOf(user._id), 1);
        $scope.currentUser.friends.push(user._id);
        user.requests.splice(user.requests.indexOf($scope.currentUser._id), 1);
        user.friends.push($scope.currentUser._id);
        // console.log($scope.currentUser, user);
      });
    };

    $scope.cancelRequest = function (user) {
      users.cancelRequest($scope.currentUser, user).then(function () {
        $scope.currentUser.requests.splice($scope.currentUser.requests.indexOf(user._id), 1);
        user.toConfirm.splice(user.toConfirm.indexOf($scope.currentUser._id), 1);
      });
    };

    $scope.ignoreRequest = function (user) {
      users.ignoreRequest($scope.currentUser, user).then(function() {
        $scope.currentUser.toConfirm.splice($scope.currentUser.toConfirm.indexOf(user._id), 1);
        user.requests.splice(user.requests.indexOf($scope.currentUser._id), 1);
      });
    };

    $scope.removeFriend = function (user) {
      // console.log('1');
      users.removeFriend($scope.currentUser, user).then(function () {
        $scope.currentUser.friends.splice($scope.currentUser.friends.indexOf(user._id),1);
        user.friends.splice(user.friends.indexOf($scope.currentUser._id),1);
      });
    };

    $scope.findUserById = function (id) {
      for (var i=0; i<$scope.users.length; i++) {
        if (id === $scope.users[i]._id) {
          return $scope.users[i].username;
        }
      }
      // return 'Erez this code sucks'; 
    };
  }
}]);