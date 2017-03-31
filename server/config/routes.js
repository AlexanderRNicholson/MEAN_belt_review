var belt_review = require('./../controllers/belt_review.js')

module.exports = function(app){

  app.post('/login', belt_review.login);
  app.post('/register', belt_review.register);
  app.get('/logout', belt_review.logout);
  app.use(authenticateUser);
  app.get('/topics', belt_review.getTopics);
  app.post('/topic', belt_review.addTopic)
  app.get('/current', belt_review.current);
  app.get('/topic/:id', belt_review.showTopic);
  app.get('/user/:id', belt_review.showUser);
  app.post('/answer/:id', belt_review.addAnswer);
  // app.get('/answers', belt_review.getAnswers);
  app.get('/upvote/:id', belt_review.upVote);
  app.get('/downvote/:id', belt_review.downVote);
  app.post('/comment/:id', belt_review.addComment);

}

function authenticateUser(req, res, next){
  if(req.session.user){
    next();
  }
  else {res.sendStatus(401);
  }
}
