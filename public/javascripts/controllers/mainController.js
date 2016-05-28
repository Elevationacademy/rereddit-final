app.controller('MainCtrl', ['$scope', 'posts', 'auth', function($scope, posts, auth){
  $scope.posts = posts.posts;
  // console.log($scope.posts);
  $scope.isLoggedIn = auth.isLoggedIn();
  // console.log($scope.isLoggedIn);
  $scope.addPost = function() {
    if ($scope.title === '') { return; }

    posts.create({ 
      title: $scope.title, 
      link: $scope.link
    });

    $scope.title = '';
    $scope.link = '';
  };

  $scope.incrementUpvotes = function(item) {
    posts.upvote(item);
  };
}]);