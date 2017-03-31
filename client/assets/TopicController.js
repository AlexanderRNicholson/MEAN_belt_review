app.controller('TopicController', ['$scope', '$location', '$routeParams', 'Factory', function($scope, $location, $routeParams, Factory){

function showTopic(id){
  console.log($routeParams.id);
  Factory.showTopic(id, function(data){
    $scope.showTopic = data
  })
}
$scope.addAnswer = function(answer){
  console.log(answer);
  Factory.addAnswer(answer, $routeParams.id, showTopic);
  $scope.newAnswer = {};
}
// function getAnswers(){
//   Factory.getAnswers(function(data){
//     $scope.answers = data;
//   })
// }
 $scope.upVote = function(id){
   console.log(id);
  Factory.upVote(id, showTopic, $routeParams.id);
}
$scope.downVote = function(id){
  console.log(id);
 Factory.downVote(id, showTopic, $routeParams.id);
}
$scope.addComment = function(comment, id){
  console.log(comment);
  Factory.addComment(comment, id, function (res){
    showTopic($routeParams.id)
  });
  console.log($scope.comments);
  $scope.newComment = {};
}

showTopic($routeParams.id);
// getAnswers();
}])
