require('dotenv').load();
const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

app.use(express.static('public'));
app.use(express.json());
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {User, Dog} = require('./models');

const dogsRouter = require('./dogs');
const { router: usersRouter } = require('./users');
const { router: authRouter } = require('./auth');

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(204);
//   }
//   next();
// });

app.use(morgan('common'));
app.use('/dogs', dogsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useNewUrlParser: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
