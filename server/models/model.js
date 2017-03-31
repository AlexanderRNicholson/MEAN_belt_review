var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true})

var TopicSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  answers: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
}, {timestamps: true})

var AnswerSchema = new mongoose.Schema({
  content: {type: String, required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  upvotes: {type: Number, required: true, default: 0},
  downvotes: {type: Number, required: true, default: 0}
}, {timestamps: true})

var CommentSchema = new mongoose.Schema({
  content: {type: String, required: true},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _answer: {type: Schema.Types.ObjectId, ref: 'Answer'}

}, {timestamps: true})


mongoose.model('User', UserSchema)
mongoose.model('Topic', TopicSchema)
mongoose.model('Answer', AnswerSchema)
mongoose.model('Comment', CommentSchema)
