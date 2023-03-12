const { getAll } = require('./contacts/getAll');
const { getById } = require('./contacts/getById');
const { add } = require('./contacts/add');
const { removeById } = require('./contacts/removeById');
const { updateById } = require('./contacts/updateById');

const { registration } = require('./auth/registration');
const { login } = require('./auth/login');

const ctrlWrapper = require('../helpers/ctrlWrapper');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),

  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
};
