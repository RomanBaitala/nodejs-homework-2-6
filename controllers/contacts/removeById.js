const createError = require('http-errors');
const { Contact } = require('../../models/contacts');

const removeById = async (req, res) => {
  const contacts = await Contact.findByIdAndRemove(req.params.contactId);

  if (!contacts) throw createError(404, 'Not found');

  res.json({
    status: 'succuess',
    code: 200,
    data: {
      contacts,
    },
  });
};

module.exports = { removeById };
