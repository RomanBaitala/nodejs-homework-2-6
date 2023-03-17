const { Contact } = require('../../models/contacts');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  let contacts = {};
  if (favorite) {
    contacts = await Contact.find(
      { owner, favorite },
      '-createdAt -updatedAt',
      {
        skip,
        limit,
      }
    );
  } else {
    contacts = await Contact.find({ owner }, '-createdAt -updatedAt', {
      skip,
      limit,
    });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
};

module.exports = { getAll };
