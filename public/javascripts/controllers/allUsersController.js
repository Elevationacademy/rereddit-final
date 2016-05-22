app.controller('AllUsersCtrl', ['$scope', 'users',  function($scope, users){

  $scope.users = users.users;
  
}]);