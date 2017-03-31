var app = angular.module('app', ['ngRoute', 'ngMessages'])

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'UserController'
    })
    .when('/dashboard', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/user/:id', {
      templateUrl: 'partials/showuser.html',
      controller: 'UserController'
    })
    .when('/topic/:id', {
      templateUrl: 'partials/showtopic.html',
      controller: 'TopicController'
    })
    // .otherwise({
    //   redirectTo: '/'
    // })
})
