app.controller('DashboardController', ['$scope', '$location', '$routeParams', 'Factory', function($scope, $location, $routeParams, Factory){
  function currentUser(){
    Factory.currentUser(function(data){
      $scope.user = data; //used whenever we need to get information
    });
  }
  function getTopics(){
    Factory.getTopics(function(data){
      $scope.topics = data;
    })
  }
  $scope.addTopic = function(topic){
    console.log(topic);
    Factory.addTopic(topic, getTopics);
    $scope.newTopic = {};

  }
  currentUser();
  getTopics();
}])
