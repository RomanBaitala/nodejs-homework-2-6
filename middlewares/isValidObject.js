const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidObject = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    const error = HttpError(400, `${contactId} is not correct _id format`);
    next(error);
  }
  next();
};

module.exports = isValidObject;
