const express = require('express');
const {
  isValidObject,
  validation,
  authentificate,
} = require('../../middlewares');
const { schemas } = require('../../models/contacts');
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

router.post('/', authentificate, validation(schemas.addSchema), add);

router.delete('/:contactId', authentificate, isValidObject, removeById);

router.put(
  '/:contactId',
  authentificate,
  validation(schemas.addSchema),
  updateById
);

router.patch(
  '/:contactId/favorite',
  isValidObject,
  validation(schemas.togglefavorite),
  updateById
);

module.exports = router;
