app.factory('usersServ', ['$http', 'auth', function ($http, auth) {
  var UsersServ = {
    user: {},
    users: [],
    friends: [],


    getUser: function (id) {
      $http.get('/users/user/' + id).then(function (data) {
        angular.copy(data.data, UsersServ.user);
      });
    },

    getUsers: function () {
      $http.get('/users/getAll').then(function (data) {
        angular.copy(data.data, UsersServ.users);
      }, function (err) {
        console.error(err);
      });
    },

    getFriends: function (id) {
      $http.get('/users/' + id + '/getFriends').then(function (data) {
        angular.copy(data.data, UsersServ.friends);
      }, function (err) {
        console.log(err);
      });
    },

    addFriend: function (currentUserId, friendId) {
      $http.post('/users/' + currentUserId + '/addFriend', {id: friendId}, {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).then(function () {
        UsersServ.friends.push(friendId);
      }, function (err) {
        console.log(err);
      });
    },

    removeFriend: function (currentUserId, friendId) {
      $http.put('/users/' + currentUserId + '/removeFriend', {id: friendId}, {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).then(function () {
        var idx = UsersServ.friends.indexOf(friendId);
        UsersServ.friends.splice(idx, 1);
      }, function (err) {
        console.log(err);
      });
    }

  };

  return UsersServ;
}]);
