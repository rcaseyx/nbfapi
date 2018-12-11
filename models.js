'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dogSchema = mongoose.Schema({
  name: String,
  age: String,
  size: String,
  about: String,
  mainImage: String,
  url: String
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = { Dog };
