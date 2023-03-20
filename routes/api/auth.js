const express = require('express');

const { validation, authentificate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');
const {
  registration,
  login,
  getCurrent,
  logout,
  updateSub,
  changeAvatar,
} = require('../../controllers/index');

const router = express.Router();

router.post('/register', validation(schemas.registerSchema), registration);

router.post('/login', validation(schemas.loginSchema), login);

router.get('/current', authentificate, getCurrent);

router.post('/logout', authentificate, logout);

router.patch('/avatar', authentificate, upload.single('avatar'), changeAvatar);

router.patch(
  '/users',
  authentificate,
  validation(schemas.updateSubscription),
  updateSub
);

module.exports = router;
