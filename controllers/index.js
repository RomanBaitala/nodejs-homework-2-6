const { getAll } = require('./contacts/getAll');
const { getById } = require('./contacts/getById');
const { add } = require('./contacts/add');
const { removeById } = require('./contacts/removeById');
const { updateById } = require('./contacts/updateById');

const { registration } = require('./auth/registration');
const { login } = require('./auth/login');
const { getCurrent } = require('./auth/getCurrent');
const { logout } = require('./auth/logout');
const { updateSubscription } = require('./auth/updateSub');
const { changeAvatar } = require('./auth/changeAvatar');

const ctrlWrapper = require('../helpers/ctrlWrapper');

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),

  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSub: ctrlWrapper(updateSubscription),
  changeAvatar: ctrlWrapper(changeAvatar),
};
