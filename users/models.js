'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  savedDogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dog' }],
  preferences: {
      age: {type: String, default: 'any'},
      size: {type: String, default: 'any'}
  }
});

userSchema.methods.serialize = function() {
  return {
    id: this.id,
    username: this.username || '',
    firstName: this.firstName || '',
    savedDogs: this.savedDogs,
    preferences: this.preferences
  };
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.pre('find', function(next) {
  this.populate('savedDogs');
  next();
});

userSchema.pre('findOne', function(next) {
  this.populate('savedDogs');
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = {User};
