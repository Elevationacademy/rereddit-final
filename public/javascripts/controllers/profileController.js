app.controller('ProfileCtrl', ['$scope', 'users', 'auth', function($scope, users, auth) {

  



  $scope.addFriend = function (friend) {
   users.addFriend($scope.currentUser, friend).then(function(result){
            $scope.currentUser.friends.push(friend._id);
            friend.friends.push($scope.currentUser._id);  
          });   

  };

  

}]);