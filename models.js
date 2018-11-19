'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dogSchema = mongoose.Schema({
  name: String,
  age: String,
  bio: String,
  mainImage: String,
  image2: String,
  image3: String,
  url: String
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = { Dog };
