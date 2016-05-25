app.controller('AllUsersCtrl', ['$scope', 'users', 'auth',  function($scope, users, auth){

  $scope.users = users.users;
  
  $scope.currentUser = function () {
    for( var i = 0; i < $scope.users.length; i ++ ) {

      if ( $scope.users[i]._id === auth.currentUser()._id ) {
        return $scope.users[i];
      }
    }
  };

  $scope.isCurrentUser = function (userName) {
    console.log(userName);

    if ( $scope.currentUser().username === userName ) {
      return true;
    }

  };
  
  $scope.addFriend = function (clickedUserId) {
    users.addFriend(clickedUserId, $scope.currentUser()._id);
  };

  $scope.removeFriend = function (clickedUserId) {
    users.removeFriend(clickedUserId, $scope.currentUser()._id);
  };

  $scope.friend = function (friendId) {
    for ( var i = 0; i < $scope.currentUser().friends.length; i ++ ){
      if ( $scope.currentUser().friends[i] === friendId ) {
        console.log('friend');
        return false;
      } 
    }
    console.log('hello');
    return true;
  };

  
}]);