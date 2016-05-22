app.controller('MainCtrl', ['$scope', 'posts', '$state',function($scope, posts, $state){
  $scope.posts = posts.posts;

  $scope.addPost = function() {
    if ($scope.title === '') { return; }

    posts.create({ 
      title: $scope.title, 
      link: $scope.link
    });

    $scope.title = '';
    $scope.link = '';
  }

  $scope.incrementUpvotes = function(item) {
    posts.upvote(item);
  }

  $scope.allUsersPage = function () {
    console.log('allusers function')
    $state.go('allusers');
  }
}]);