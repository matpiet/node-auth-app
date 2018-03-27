const express = require('express');
var path = require('path');
const hbs = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var logger = require('morgan');
var helmet = require('helmet');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

const publicPath = path.join(__dirname, '..', 'public');
port = process.env.PORT || 3000;


var app = express();
var expressValidator = require('express-validator');
app.use(bodyParser.urlencoded({ extended: true }));

// Add Form Input Validation using express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Handle Sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(require('connect-flash')());

app.use(express.static(publicPath));
app.use(helmet());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require('./../config/hbs_config')

var routes = require('./routes/index');
var users = require('./routes/users');
app.use('/', routes);
app.use('/users', users);






app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

console.log('logger');

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports.app = app; 
