var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session')
var app = express();

//session config
var sessionConfig = {
  secret: 'CookieMonster', //secret name for decoding
  resave: false, //don't resave session if no changes made
  saveUninitialized: true, //don't save session if nothing initialised
  name: 'myCookie', // sets a custom cookie
  cookie: {
    secure: false, //needs to be true on HTTPS
    httpOnly: false, //forces cookies only used over http
    maxAge: 360000000
  }
}
app.use(session(sessionConfig));

app.use(express.static(path.join(__dirname, 'client')))
app.use(express.static(path.join(__dirname, 'bower_components')))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(8000, function(){
  console.log('the server is running on 8000');
})
