'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const dogSchema = mongoose.Schema({
  name: String,
  age: String,
  size: String,
  about: String,
  image: String,
  url: String
});

dogSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    age: this.age,
    size: this.size,
    about: this.about,
    image: this.image,
    url: this.url
  }
};

const Dog = mongoose.model('Dog', dogSchema);

module.exports = { Dog };
