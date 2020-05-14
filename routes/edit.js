'use strict';

const { Router } = require('express');
const editRouter = Router();
const routerGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

editRouter.get('/:id', (req, res, next) => {
  res.render('edit');
});

editRouter.post('/:id', routerGuard, (req, res, next) => {
  const id = req.params.id;
  const { username, role, birthyDay, nick, game } = req.body;
  User.findByIdAndUpdate(id, {
    username,
    role,
    birthyDay, // Check date format on html/mongoose
    nick,
    game
  })
    .then((result) => res.redirect('/authentication/private'))
    .catch((error) => next(error));
});

module.exports = editRouter;
