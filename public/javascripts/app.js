 var app = angular.module('redditFun', ['ui.router']);

app.config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html',
      controller: 'MainCtrl',
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
    })
    .state('post', {
      url: '/posts/:id',
      templateUrl: '/templates/posts.html',
      controller: 'PostsCtrl',
      resolve: {
        post: ['$stateParams', 'posts', function($stateParams, posts) {
          return posts.get($stateParams.id);
        }]
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', '$timeout', function($state, auth, $timeout){
        // console.log('1');
        if(auth.isLoggedIn()){
          $timeout(function () {
            $state.go('home');
          },50);
        }
      }]
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'AuthCtrl',
      onEnter: ['$state', 'auth', '$timeout', function($state, auth, $timeout){
        // console.log('1');
        if(auth.isLoggedIn()){
          $timeout(function () {
            $state.go('home');
          },50);
        }
      }]
    })
    .state('users', {
      url: '/users',
      templateUrl: '/templates/users.html',
      controller: 'UsersCtrl',
      resolve: {
        userPromise: ['users', function (users) {
          // console.log(users);
          return users.getAll();
        }]
      },
      // onEnter: ['$state', 'auth', function($state, auth){
      //   console.log('1');
      //   if(!auth.isLoggedIn()){
      //     $state.go('home');
      //   }
      // }]
      onEnter: ['$state', 'auth', '$timeout', function($state, auth, $timeout){
        // console.log('1');
        if(!auth.isLoggedIn()){
          $timeout(function () {
            $state.go('home');
          },50);
        }
      }]

    })
    .state('profile', {
      url: '/profile/:id',
      templateUrl: 'templates/profile.html',
      controller: 'UsersCtrl',
      resolve: {
        userPromise: ['users', function (users) {
          // console.log(users);
          return users.getAll();
        }]
      },
      onEnter: ['$state', 'auth', '$timeout', function($state, auth, $timeout){
        // console.log('1');
        if(!auth.isLoggedIn()){
          $timeout(function () {
            $state.go('home');
          },50);
        }
      }]
    })
    .state('myProfile', {
      url: '/myProfile',
      templateUrl: 'templates/myProfile.html',
      controller: 'UsersCtrl',
      resolve: {
        userPromise: ['users', function (users) {
          // console.log(users);
          return users.getAll();
        }]
        // security: ['$q', 'auth', function ($q, auth) {
        //   if(!auth.isLoggedIn()){
        //     console.log('1', $q.reject);
        //     // $state.go('home');
        //     // return $q.reject("Not Authorized");
        //   }
        // }]
      },
      onEnter: ['$state', 'auth', '$timeout', function($state, auth, $timeout){
        // console.log('1');
        if(!auth.isLoggedIn()){
          $timeout(function () {
            $state.go('home');
          },50);
        }
      }]
    })
    //   resolve: {
    //     user: ['$stateParams', 'users', function ($stateParams, users) {
    //       return users.get($stateParams.id);
    //     }]
    //   }
    // })

  $urlRouterProvider.otherwise('home');
}]);