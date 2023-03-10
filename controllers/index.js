const { getAll } = require('./contacts/getAll');
const { getById } = require('./contacts/getById');
const { add } = require('./contacts/add');
const { removeById } = require('./contacts/removeById');
const { updateById } = require('./contacts/updateById');

const { ctrlWrapper } = require('../helpers');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
