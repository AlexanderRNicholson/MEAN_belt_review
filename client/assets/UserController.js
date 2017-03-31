app.controller('UserController', ['$scope', '$location', '$routeParams', 'Factory', function($scope, $location, $routeParams, Factory){

    $scope.register = function(newUser){
      console.log(newUser);
      Factory.register(newUser);
      $scope.newUser = {};
    };
    $scope.login = function(returningUser){
      console.log(returningUser);
      Factory.login(returningUser);
      $scope.returningUser = {};
    };
  function showUser(id){
      console.log($routeParams.id);
      Factory.showUser(id, function(data){
        $scope.showUser = data;
      })
    }
showUser($routeParams.id)
}])
