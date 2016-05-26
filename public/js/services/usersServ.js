app.factory('usersServ', ['$http', 'auth', function ($http, auth) {
  var UsersServ = {
    user: {},
    users: [],
    friends: [],
    requests: [],

    getUser: function (id) {
      $http.get('/users/user/' + id).then(function (data) {
        angular.copy(data.data, UsersServ.user);
        console.log(data.data);
      });
    },

    getUsers: function () {
      $http.get('/users/getAll').then(function (data) {
        angular.copy(data.data, UsersServ.users);
        console.log(data.data);
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

    getRequests: function (id) {
      $http.get('/users/' + id + '/getRequests').then(function (data) {
        angular.copy(data.data, UsersServ.requests);
      }, function (err) {
        console.log(err);
      });
    },

    addReqFriend: function (currentUserId, friendOnReqId) {
      $http.post('/users/' + currentUserId + '/reqFriendship', {id: friendOnReqId}, {
          headers: {Authorization: 'Bearer '+ auth.getToken()}
        })
         .then(function (data) {
           UsersServ.requests.push(friendOnReqId);
          }, function (err) {
            console.error(err);
          });
    },

    addFriend: function (currentUserId, friendId, result) {
      $http.post('/users/' + currentUserId + '/friendship', {id: friendId, confirm: result}, {
        headers: {Authorization: 'Bearer '+ auth.getToken()}
      }).then(function (data) {
        // remove from requests
        var idx = UsersServ.requests.indexOf(friendId)
        UsersServ.requests.splice(idx, 1);

        if (result) {
          // add friend
          UsersServ.friends.push(friendId);
        }

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
