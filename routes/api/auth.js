const express = require('express');

const { isValidObject, validation } = require('../../middlewares');
const { schemas } = require('../../models/user');
const { registration, login } = require('../../controllers/index');

const router = express.Router();

router.post('/register', validation(schemas.registerSchema), registration);

router.post('/login', validation(schemas.loginSchema), login);

module.exports = router;
