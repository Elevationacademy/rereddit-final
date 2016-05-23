app.controller('FriendFinderCtrl', ['$scope', 'auth','users', function($scope, auth, users){
  
  console.log("in app controller");
  $scope.users = users.users;
  var cu = auth.currentUser();

  $scope.userStatus = auth.isLoggedIn();
  $scope.cu = cu;

  $scope.friends = $scope.cu.friends;

  $scope.amigos = [];

  //finding the friends
  $scope.renderFriends = function() {
    // console.log('hey')
    for (var i =0; i < $scope.friends.length; i++) {
      for(var j= 0; j < $scope.users.length; j++){
        if ($scope.friends[i] === $scope.users[j]._id){
        console.log($scope.users[j].username)
        $scope.amigos.push($scope.users[j].username);
        // console.log($scope.amigos)
        } //if
      }//2nd for
    }//1st for
  }

  $scope.isFriend = function(friend){
  
  	for(var i = 0; i < cu.friends.length; i++){
  		if(cu.friends[i] == friend._id){
  			return true;
  		}
  	}	
  	return false;
  }

  $scope.isNotSelf = function(friend){

  	if(cu._id != friend._id){
  		return true;
  	}
  	return false;
  }

  $scope.addFriend = function(friend){
  	users.addFriend(cu._id, friend);	
  }

}]);