'use strict';

const { Router } = require('express');
const restrictRouter = Router();
const routerGuard = require('./../middleware/route-guard');
const roleGuard = require('./../middleware/role-guard');

restrictRouter.get(
  '/dog',
  routerGuard,
  roleGuard(['cat', 'dog']),
  (req, res, next) => {
    res.render('restrict/dog');
  }
);

restrictRouter.get(
  '/cat',
  routerGuard,
  roleGuard(['cat', 'dog']),
  (req, res, next) => {
    res.render('restrict/cat');
  }
);

restrictRouter.get(
  '/bird',
  routerGuard,
  roleGuard(['bird']),
  (req, res, next) => {
    res.render('restrict/bird');
  }
);

//add post method to each animal

module.exports = restrictRouter;
