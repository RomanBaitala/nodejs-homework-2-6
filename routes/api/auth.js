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
  verifyEmail,
  resendVerifyEmail,
} = require('../../controllers/index');

const router = express.Router();

router.post('/register', validation(schemas.registerSchema), registration);

router.get('/verify/:verificationCode', verifyEmail);

router.post('/verify', validation(schemas.emailSchema), resendVerifyEmail);

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
