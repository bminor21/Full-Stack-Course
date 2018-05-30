/* Imports */
var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var flash = require('connect-flash');

/* Routes */
var routes = require('./routes/index');
var users = require('./routes/users');

/* Create Application */
var app = express();

/* View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Set Static Folder(s) */
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

/* Middleware Setup */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

//Express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

//Connect-Flash Middleware
app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req,res);
  next();
});

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

/* Routing */
app.use('/', routes );
app.use('/users', users);

/* Run the Server */
app.listen(3000);
console.log('Server started on Port 3000');
