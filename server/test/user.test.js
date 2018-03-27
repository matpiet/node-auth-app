const {ObjectID} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');

var {User} = require('../models/user');
const {users, populateUsers} = require('./seed/seed');

//beforeEach(populateUsers);

it('get the index page', function(done) {
  this.timeout(10000);
  setTimeout(() =>{
    request(app)
        .get('/')
        .expect(200)
        .end(done)
  }, 100)
});

it('get the register user page', function(done){
  this.timeout(10000);
  setTimeout(() =>{
    request(app)
        .get('/users/register')
        .expect(200)
        .end(done)
  }, 100)
});

it('post a user to the register page', function(done){
  this.timeout(10000);
  var testUser = {name : 'Steve2', email: 'steve@test.steve', username:'Stevieo', password:'Testivarina', confirmPassword:'Testivarina'}
  request(app)
      .post('/users/register')
      .field(testUser)
      .expect(200)
      .expect((res) => {
        expect(res.text).not.toMatch('error-messages');
        expect(res.text).toMatch('You have sucessfully registered.');
        //expect(res.text).toMatch('<form method=\'Post\' action=\'/users/register\' enctype=\'multipart/form-data\'>');
      })
      .end((err, res) => {
        setTimeout(() => {
          User.findOne({ 'name': 'Steve2' }, 'name', function (err, user) {
          if (err) done(err);
              expect(testUser.name).toBe(user.name);
              done();
           });
        }, 100);

      });
});
