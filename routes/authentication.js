'use strict';

const { Router } = require('express');
const authenticationRouter = Router();
const passport = require('passport');
const routerGuard = require('./../middleware/route-guard');
// Github.

authenticationRouter.get(
  '/github',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

authenticationRouter.get(
  '/github-callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/error'
  })
);

// Sign in local:

authenticationRouter.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

authenticationRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: 'authentication/sign-in'
  })
);

authenticationRouter.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

authenticationRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: 'authentication/sign-up'
  })
);

authenticationRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

authenticationRouter.get('/private', routerGuard, (req, res, next) => {
  res.render('authentication/private');
});

module.exports = authenticationRouter;
