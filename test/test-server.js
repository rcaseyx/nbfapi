'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const faker = require('faker');

const { app, runServer, closeServer } = require('../server');
const { Dog } = require('../models');
const { User } = require('../users');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);

let userId;
let token;

function seedDogData() {
  console.info('seeding Dog data');
  const seedData = [];

  for (let i =1; i <= 10; i++ ) {
    seedData.push(generateDogData());
  }

  return Dog.insertMany(seedData);
}

function generateDogData() {
  return {
    name: faker.name.firstName(),
    age: faker.random.word(),
    size: faker.random.word(),
    about: faker.random.words(),
    image: faker.image.imageUrl(),
    url: faker.internet.url()
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.db.dropDatabase();
}

describe('New Best Friend API', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  before(function() {
    return seedDogData();
  });

  after(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('POST /users and login', function() {
    it('should create a user and return user ID', function() {
      let data = {
        username: 'test.user',
        password: 'testingpassword'
      }
      let res;
      return chai.request(app)
        .post('/users')
        .send(data)
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(201);
          expect(res.body.id).to.not.be.null;
          expect(res.body.username).to.not.be.null;
          userId = res.body.id;
          return User.findById(userId);
        })
        .then(function(user) {
          expect(res.body.id).to.equal(user.id);
          expect(user.username).to.equal(data.username);
        });
    });

    it('should return auth token on login', function() {
      let data = {
        username: 'test.user',
        password: 'testingpassword'
      }
      let res;
      return chai.request(app)
        .post('/auth/login')
        .send(data)
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.authToken).to.not.be.null;
          expect(res.body.user).to.be.a('object');
          token = res.body.authToken;
          return User.findById(res.body.user.id);
        })
        .then(function(user) {
          expect(res.body.user.id).to.equal(user.id);
          expect(res.body.user.username).to.equal(user.username);
        });
    });
  });

  describe('GET endpoints', function() {
    it('should return all existing dogs', function() {
      let res;
      let auth = `Bearer ${token}`;
      return chai.request(app)
        .get('/dogs')
        .set('Authorization', auth)
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.dogs).to.have.lengthOf.at.least(1);
          return Dog.count();
        })
        .then(function(count) {
          expect(res.body.dogs).to.have.lengthOf(count);
        });
    });

    it('should return 401 on /dogs if user is not recognized', function() {
      return chai.request(app)
        .get('/dogs')
        .then(function(res) {
          expect(res).to.have.status(401);
        });
    });

    
  });
});
