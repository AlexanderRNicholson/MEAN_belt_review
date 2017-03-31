app.factory('Factory', ['$location', '$http', function($location, $http){
  var factory = {};
  factory.register = function(user){
    $http({
      url: '/register',
      method: 'POST',
      data: user
    }).then(function(res){
      console.log(res);
      $location.url('/dashboard')
    }, function(res){
      console.log(res);
    })
  };
  factory.login = function(user){
    $http({
      url: '/login',
      method: 'POST',
      data: user
    }).then(function(res){
      console.log(res);
      $location.url('/dashboard')
    }, function(res){
      console.log(res);
    })
  };
  factory.currentUser = function(callback){
    $http({
      url: '/current',
      method: 'GET'
    }).then(function(res){
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }
  factory.addTopic = function(topic, callback){
    $http({
      url: '/topic',
      method: 'POST',
      data: topic
    }).then(function(res){
      console.log(res);
      callback();
    }, function(res){
      alert(res.data)
    })
  }
  factory.getTopics = function(callback){
    $http({
      url: '/topics',
      method: 'GET'
    }).then(function(res){
      console.log(res);
      callback(res.data)
    }, function(res){
      alert(res.data);
    })
  }
  factory.showUser = function(id, callback){
    $http({
      url: '/user/' + id,
      method:  'GET'
    }).then(function(res){
      console.log(res);
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }
  factory.showTopic = function(id, callback){
    $http({
      url: '/topic/' + id,
      method:  'GET'
    }).then(function(res){
      console.log(res);
      callback(res.data);
    }, function(res){
      console.log(res);
    })
  }
  factory.addAnswer = function(answer, id, callback){
    $http({
      url: '/answer/' + id,
      method: 'POST',
      data: answer
    }).then(function(res){
      console.log(res);
      callback(id);
  })}
  // factory.getAnswers = function(callback){
  //   $http({
  //     url: '/answers',
  //     method: 'GET'
  //   }).then(function(res){
  //     console.log(res);
  //     callback(res.data)
  //   }, function(res){
  //     alert(res.data);
  //   })
  // }
  factory.upVote = function(id, callback, topicid){
    $http({
      url: '/upvote/' + id,
      method: 'GET'
    }).then(function(res){
      console.log(res);
      callback(topicid);
    })
  }
  factory.downVote = function(id, callback, topicid){
    $http({
      url: '/downvote/' + id,
      method: 'GET'
    }).then(function(res){
      console.log(res);
      callback(topicid);
    })
  }
  factory.addComment = function(comment, id, callback){
    $http({
      url: '/comment/' + id,
      method: 'POST',
      data: comment
    }).then(function(res){
      console.log(res);
      callback();
    }, function(res){
      alert(res.data)
    })
  }
  factory.getComments = function(callback){
    $http({
      url: '/comments',
      method: 'GET'
    }).then(function(res){
      console.log(res);
      callback(res.data)
    }, function(res){
      alert(res.data);
    })
  }
  return factory;
}])
