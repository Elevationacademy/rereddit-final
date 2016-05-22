app.factory('usersServ', ['$http', function ($http) {
  var UsersServ = {
    users: [],

    getUsers: function () {
      $http.get('/users/getAll').then(function (data) {
        console.log(data.data);
        angular.copy(data.data, UsersServ.users);
      }, function (err) {
        console.log(err);
      });
    }
  };

  return UsersServ;
}])
