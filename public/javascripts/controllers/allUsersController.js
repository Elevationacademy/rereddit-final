app.controller('AllUsersCtrl', ['$scope', 'users', 'auth',  function($scope, users, auth){

  $scope.users = users.users;
  // console.log($scope.users[0].friends);
  $scope.currentUser = auth.currentUser();
  console.log($scope.currentUser.friends);

  $scope.addFriend = function (clickedUserId) {

    users.addFriend(clickedUserId, $scope.currentUser._id);

  };

  $scope.notFriend = function (friendId) {

    for (var i = 0; i < $scope.currentUser.friends; i ++) {
      
      if( $scope.currentUser.friends[i] === friendId){
        console.log($scope.currentUser.friends[i]);
        return false;
      }

    }

  };

  $scope.Friend = function () {

  };
  
}]);