app.controller('FriendFinderCtrl', ['$scope', 'auth','users', function($scope, auth, users){
  
  console.log("in app controller");
  $scope.users = users.users;
  var cu = auth.currentUser();

  $scope.isFriend = function(friendName){
  	
  	if(cu.friends.indexOf(friendName) > -1){
  		return true
  	}

  	return false;
  }

  $scope.isNotSelf = function(friendName){
  	if(cu.username != friendName){
  		return true;
  	}
  	return false;
  }

  $scope.addFriend = function(friend){
  	console.log("in add friend")
  	users.addFriend(cu._id, friend);	
  }

}]);