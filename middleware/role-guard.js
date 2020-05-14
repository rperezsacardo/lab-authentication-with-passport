module.exports = (allowedRoles) => (req, res, next) => {
  if (allowedRoles.includes(req.user.role)) {
    next();
  } else {
    const error = new Error('Not authorized');
    next(error);
    res.redirect('/');
  }
};
