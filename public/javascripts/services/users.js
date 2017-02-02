app.factory('users', ['$http', function($http) {
  console.log("in friend finder service");
  var userservice = {
    users: [],

    getAll: function() {
      return $http.get('/users').then(function(data) {
  
        angular.copy(data.data, userservice.users);
      });
    },

    get: function(id) {
      return $http.get('/users/' + id).then(function(res){
        return res.data;
      });
    }
  };

  return userservice;
}]);