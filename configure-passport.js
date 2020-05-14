'use strict';
const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');

const Localstrategy = passportLocal.Strategy;
const GitHubStrategy = require('passport-github').Strategy;

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

//Git Hub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/authentication/github-callback',
      scope: 'user:email'
    },
    (accessToken, refreshToken, profile, callback) => {
      const username = profile.displayName;
      const email = profile.emails.length ? profile.emails[0].value : null;
      const avatar = profile._json.avatar_url;
      const githubId = profile.id;

      User.findOne({ githubId })
        .then((user) => {
          if (user) {
            return Promise.resolve(user);
          } else {
            return User.create({
              username,
              email,
              avatar,
              githubId
            });
          }
        })
        .then((user) => {
          callback(null, user);
        })
        .catch((error) => {
          callback(error);
        });
    }
  )
);

//Local Strategy:

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
