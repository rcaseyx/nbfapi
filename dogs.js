const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
mongoose.Promise = global.Promise;

const { Dog } = require('./models');
const { localStrategy, jwtStrategy } = require('./auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/', jwtAuth, (req, res) => {
  Dog.find()
    .then(dogs => {
      res.json({
        dogs: dogs.map(dog => dog.serialize())
      })
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

router.get('/:id', jwtAuth, (req, res) => {
  Dog.findById(req.params.id)
    .then(dog => res.json(dog.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
