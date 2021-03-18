'use strict';

const base64 = require('base-64');
const User = require('../models/users.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { next('invalid'); }

  let [basic, info] = req.headers.authorization.split(' ');
  if (basic === 'Bearer') {
    next();
  }
  else {
    let [user, pass] = base64.decode(info).split(':');
    console.log(user, pass);
    try {
      req.user = await User.authenticateBasic(user, pass)
      console.log(req.user);
      next();
    } catch (e) {
      res.status(403).send('Invalid Login');
    }
  }
};