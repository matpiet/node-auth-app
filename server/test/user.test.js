const {ObjectID} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

var {User} = require('../models/user');
const {users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);

it('find a user by id', (done) => {
  console.log(users);
  var res = User.getUserById(users[0]._id);

  if (res.name !== 'andy Dalton') {
    throw new Error(`Expected andy Dalton, but got ${res.name}.`)
  }
  done();

});
