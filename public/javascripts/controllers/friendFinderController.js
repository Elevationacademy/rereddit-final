app.controller('FriendFinderCtrl', ['$scope', 'users', function($scope, users){
  
  console.log("in app controller");
  $scope.users = users.users;

}]);