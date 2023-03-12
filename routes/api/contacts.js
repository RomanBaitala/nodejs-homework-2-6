const express = require('express');
const {
  isValidObject,
  validation,
  authentificate,
} = require('../../middlewares');
const { joi } = require('../../models/contacts');
const {
  add,
  getAll,
  getById,
  removeById,
  updateById,
} = require('../../controllers');

const router = express.Router();

router.get('/', authentificate, getAll);

router.get('/:contactId', authentificate, isValidObject, getById);

router.post('/', authentificate, validation(joi.schema), add);

router.delete('/:contactId', authentificate, isValidObject, removeById);

router.put('/:contactId', authentificate, validation(joi.schema), updateById);

router.patch(
  '/:contactId/favorite',
  isValidObject,
  validation(joi.togglefavorite),
  updateById
);

module.exports = router;
