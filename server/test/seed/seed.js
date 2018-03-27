const {ObjectID} = require('mongodb');
var mongoose = require('mongoose');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  name :  'andy Dalton',
  email : 'andrew@example.com',
  username : 'andy',
  password: 'userOnePass'
}, {
  _id: userTwoId,
  name :  'Jay Swizzle',
  email: 'jay@example.com',
  username : 'Jay',
  password: 'userTwoPass'
}];

const populateUsers = function(done) {
  this.timeout(30000);
  User.remove({}).then(() => {
    //console.log(`userOne ${users}`);
    var userOne = new User(users[0]).save();
    console.log('save1');
    var userTwo = new User(users[1]).save();
    console.log('save2');
    return Promise.all([userOne, userTwo])
  }).then(() => {
    console.log('dhere at done!');
    done();
  });
};

module.exports = {users, populateUsers};
