app.controller('AllUsersCtrl', ['$scope', '$http' function($scope, $http){

  $scope.users = [];

  var getAll = function() {
  return $http.get('/allusers').then(function(data) {

    angular.copy(data.data, users);
  });
  };

  var get = function(id) {
    return $http.get('/allusers/' + id).then(function(res){
      return res.data;
    });
  };

  
}])