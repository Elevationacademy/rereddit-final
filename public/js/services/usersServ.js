app.factory('usersServ', ['$http', function ($http) {
  var UsersServ = {
    users: [],
    friends: [],

    getUsers: function () {
      $http.get('/users/getAll').then(function (data) {
        angular.copy(data.data, UsersServ.users);
      }, function (err) {
        console.log(err);
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
      $http.post('/users/' + currentUserId + '/addFriend', {id: friendId}).then(function () {
        UsersServ.friends.push(friendId);
      }, function (err) {
        console.log(err);
      });
    },

    removeFriend: function (currentUserId, friendId) {
      $http.put('/users/' + currentUserId + '/removeFriend', {id: friendId}).then(function () {
        var idx = UsersServ.friends.indexOf(friendId);
        UsersServ.friends.splice(idx, 1);
      }, function (err) {
        console.log(err);
      });
    }

  };

  return UsersServ;
}])
