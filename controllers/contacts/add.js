const { Contact } = require('../../models/contacts');

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await Contact.create({ ...req.body, owner });

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      contacts,
    },
  });
};

module.exports = { add };
