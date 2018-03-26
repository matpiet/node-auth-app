var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/authapp');
var bcrypt = require('bcryptjs');

var db = mongoose.connection;

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name : {
    type : String
  },
  profileImage : {
    type : String
  }
});

UserSchema.statics.getUserById = function(id){
  var User = this;
  console.log(JSON.stringify(User, undefined, 3));
  return User.findById(id).then((user) => {
    console.log(console.log(JSON.stringify(user, undefined, 2)));
  });
}

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(16, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// var createUser = (newUser, callback) => {
//   bcrypt.genSalt(15, function(err, salt) {
//       bcrypt.hash(newUser.password, salt, function(err, hash) {
//           newUser.password = hash;
//           newUser.save(callback);
//       });
//   });

//}
var User = mongoose.model('User', UserSchema);
module.exports = {User};
