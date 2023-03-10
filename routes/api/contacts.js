const express = require('express');
const { isValidObject, validation } = require('../../middlewares');
const { joi } = require('../../service/contacts');
const {
  add,
  getAll,
  getById,
  removeById,
  updateById,
} = require('../../controllers');

const router = express.Router();

router.get('/', getAll);

router.get('/:contactId', isValidObject, getById);

router.post('/', validation(joi.schema), add);

router.delete('/:contactId', isValidObject, removeById);

router.put('/:contactId', validation(joi.schema), updateById);

router.patch(
  '/:contactId/favorite',
  isValidObject,
  validation(joi.togglefavorite),
  updateById
);

module.exports = router;
