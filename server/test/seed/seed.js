const {ObjectID} = require('mongodb');

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

const populateUsers = (done) => {
  User.remove({}).then(() => {
    console.log(`userOne ${users}`);
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {users, populateUsers};
