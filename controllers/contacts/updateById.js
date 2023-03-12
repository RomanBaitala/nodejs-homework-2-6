const createError = require('http-errors');
const { Contact } = require('../../models/contacts');

const updateById = async (req, res) => {
  const contacts = await Contact.findByIdAndUpdate(req.params.contatcId);

  if (!contacts) throw createError(404, 'Not found');

  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = { updateById };
