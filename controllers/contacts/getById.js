const createError = require('http-errors');
const { Contact } = require('../../service/contacts');

const getById = async (req, res) => {
  const contacts = await Contact.findById(req.params.contactId);

  if (!contacts) throw createError(404, 'Not found');

  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = { getById };
