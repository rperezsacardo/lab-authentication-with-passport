'use strict';
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');

const Localstrategy = passportLocal.Strategy;

const User = require('./models/user');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  return User.findById(id)
    .then((user) => {
      callback(null, user);
    })
    .catch((error) => {
      callback(error);
    });
});

passport.use(
  'sign-up',
  new Localstrategy({}, (username, password, callback) => {
    bcrypt
      .hash(password, 12)
      .then((hashAndSalt) => {
        return User.create({
          username,
          passwordHash: hashAndSalt
        });
      })
      .then((user) => {
        callback(null, user);
      })
      .catch((error) => {
        callback(error);
      });
  })
);

passport.use(
  'sign-in',
  new Localstrategy({}, (username, password, callback) => {
    let user;
    User.findOne({
      username
    })
      .then((document) => {
        user = document;
        return bcrypt.compare(password, user.passwordHash);
      })
      .then((result) => {
        if (result) {
          callback(null, user);
        } else {
          return Promise.reject(new Error('invalid password or email'));
        }
      })
      .catch((error) => callback(error));
  })
);
// Passport Strategy configuration
