const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
mongoose.Promise = global.Promise;

const { Dog } = require('./models');
