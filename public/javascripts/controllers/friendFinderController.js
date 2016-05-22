app.controller('FriendFinderCtrl', ['$scope', 'auth','users', function($scope, auth, users){
  
  console.log("in app controller");
  $scope.users = users.users;
  var cu = auth.currentUser();

  console.log(cu);

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