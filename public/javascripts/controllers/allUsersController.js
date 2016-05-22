app.controller('AllUsersCtrl', ['$scope', 'users', 'auth',  function($scope, users, auth){

  $scope.users = users.users;

  $scope.addFriend = function (clickedUserId) {

    var currentUserId = auth.currentUser()._id;
    
    users.addFriend(clickedUserId, currentUserId);

  };
  
}]);