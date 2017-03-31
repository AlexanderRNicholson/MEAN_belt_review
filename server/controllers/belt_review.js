var mongoose = require('mongoose');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Answer = mongoose.model('Answer');
var Comment = mongoose.model('Comment');


module.exports = {
  register: function(req, res){
    var user = new User(req.body);
    user.save(function(err, data){
      if(err){
        res.status(400).send('User did not save.')
      }
      else{
        req.session.user = data;
        console.log(req.session.user);
        res.sendStatus(200);
      }
    })
  },
  login: function(req, res){
    User.findOne({name: req.body.name}, function(err, data){
      if(data == null){
        console.log(err);
        res.status(400).send("User not recognised.")
      }
      else{
        req.session.user = data;
        console.log("belt_review.js, printing off session ", req.session.user);
        res.sendStatus(200);
      }
    })
  },
  current: function(req, res){
    if(req.session.user){
      res.json(req.session.user);
    }else{
      res.status(401).send("No user in session.")
    }
  },
  logout: function(req, res){
    req.session.destroy();
    res.redirect('/')
  },
  addTopic: function(req, res){
    var topic = new Topic(req.body);
    topic._user = req.session.user._id;
    topic.save(function(err, data){
      if(err){
        res.status(400).send('Topic did not save.')
      }
      else{
        User.findOne({_id: req.session.user._id}, function(err, user){
          if(user == null){
            res.status(400).send("Couldn't identify user.")
          }else{
            user.topics.push(data);
            user.save(function(err, saved_user){
              if(err){
                res.status(400).send('Topic did not save.')
            }
            else{
          }
        })
          res.sendStatus(200);
      }
    })
  }})},
  getTopics: function(req, res){
    Topic.find({}).populate('_user').exec(function(err, data){
      if(err){
        console.log(err);
        res.status(400).send("Problem getting topics.")
      }
      else{
        res.json(data)
      }
    })
  },
  showUser: function(req, res){
    User.findOne({_id: req.params.id}, function(err, data){
    // Topic.find({_user: req.params.id})
    if(err){
      res.status(400).send("Didn't find user.")
    }
    else{
      data['topicNum'] = 420
      console.log("hello", data);
      res.json(data);
    }})
  },
  showTopic: function(req, res){
    Topic.findOne({_id: req.params.id}).populate({path: 'answers', populate: {path:'_user'}}).populate({path: 'answers', populate: {path: 'comments', populate: {path: '_user'}}}).exec(function(err, data){
    if(err){
      res.status(400).send("Didn't find user.")
    }
    else{
      res.json(data);
    }})
  },
  addAnswer: function(req, res){
    Topic.findOne({_id: req.params.id}, function(err, specific_topic){
    var answer = new Answer(req.body);
    answer._user = req.session.user._id;
    answer.save(function(err, new_answer){
      if(err){
        res.status(400).send('Answer did not save.')
      }
      else{
          specific_topic.answers.push(new_answer);
          specific_topic.save(function(err, update_topic){
            if(err){
              res.status(400).send(err);
            }
            else{
              User.findOne({_id: req.session.user._id}, function(err, user){
                if(user == null){
                  res.status(400).send("Couldn't identify user.")
                }else{
                  user.answers.push(new_answer);
                  user.save(function(err, saved_user){
                    if(err){
                      res.status(400).send('Answer did not save to User.')
                  }
                  else{
                    res.sendStatus(200);
                }
              })
            }
          })
      }
    })
  }})})},
  // getAnswers: function(req, res){
  //     if(err){
  //       console.log(err);
  //       res.status(400).send("Problem getting answers.")
  //     }
  //     else{
  //       res.json(data)
  //     }
  //   })
  // },
  upVote: function(req, res){
    Answer.findOne({_id: req.params.id}, function(err, answer){
      if(err){
        console.log(err);
        res.status(400).send("Problem upvoting.")
      }
      else{
        answer.upvotes++
        console.log("upvoted");
        answer.save(function(err, s_answer){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.sendStatus(200);
          }
        })
      }
    })
  },
  downVote: function(req, res){
    Answer.findOne({_id: req.params.id}, function(err, answer){
      if(err){
        console.log(err);
        res.status(400).send("Problem upvoting.")
      }
      else{
        answer.downvotes++
        console.log("downvoted");
        answer.save(function(err, s_answer){
          if(err){
            res.status(400).send(err);
          }
          else{
            res.sendStatus(200);
          }
        })
      }
    })
  },
  addComment: function(req, res){
    var comment = new Comment(req.body);
    comment._user = req.session.user._id;
    Answer.findOne({_id: req.params.id}, function(err, answer){
      if(err){
        console.log("error in server-side addComment");
      }else{
        comment._answer = answer;
        answer.comments.push(comment);
        answer.save(function(err){
          if(err){
            console.log(err);
          }
        })
        comment.save(function(err, data){
          if(err){
            res.status(400).send('Comment did not save.')
          }
          else{
            User.findOne({_id: req.session.user._id}, function(err, user){
              if(user == null){
                res.status(400).send("Couldn't identify user.")
              }else{
                user.comments.push(data);
                user.save(function(err, saved_user){
                  if(err){
                    res.status(400).send('Answer did not save to User.')
                }
                else{
                  res.sendStatus(200);
          }
        })
      }
    })

  }})}})},

  }
