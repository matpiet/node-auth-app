var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var {User} = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('users/register',{title:'Register'});
});

router.post('/register', upload.single('profileImage'), function(req, res, next) {
  var {name, email, username, password, confirmPassword} = req.body;

  if(req.file){
    //console.log('File Uploaded Sucessful...');
    var profileImage = req.file.filename;
  }
  else{
    //console.log('No File Uploaded...');
    var profileImage = 'noImage.jpg';
  }

  req.checkBody('name', 'Name field is required.').notEmpty();
  req.checkBody('email', 'Email field is required.').notEmpty();
  req.checkBody('email', 'Email field is not valid.').isEmail();
  req.checkBody('username', 'Username field is required.').notEmpty();
  req.checkBody('password', 'Password field is required.').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match.').equals(password);

  var errors = req.validationErrors();

  if(errors){
    res.render('users/register', {
      locals:' test',
      errors,
      name
    });
    //console.log('Errors.');
  } else{
    var newUser = new User({name, email, username, password, profileImage})
    newUser.save().then((user) => {
      //console.log('New User Saved');
      //console.log(JSON.stringify(user, undefined,3));
    });

    // User.createUser(newUser, (err, user) => {
    //   if(err) throw err;
    //   console.log(`User: ${user}`);
    // });
    //console.log('No Errors.');

    res.render('index', { message : 'You have sucessfully registered.' });
  }

  //console.log(`Profile image Name: ${profileImage}`);
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});



module.exports = router;
