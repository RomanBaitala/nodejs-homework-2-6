const express = require('express');

const {
  isValidObject,
  validation,
  authentificate,
} = require('../../middlewares');
const { schemas } = require('../../models/user');
const {
  registration,
  login,
  getCurrent,
  logout,
  updateSub,
} = require('../../controllers/index');

const router = express.Router();

router.post('/register', validation(schemas.registerSchema), registration);

router.post('/login', validation(schemas.loginSchema), login);

router.get('/current', authentificate, getCurrent);

router.post('/logout', authentificate, logout);

router.patch(
  '/users',
  authentificate,
  validation(schemas.updateSubscription),
  updateSub
);

module.exports = router;
