const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');

const registration = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, `Email is already in use`);

  const newUser = await User.create(req.body);

  res.status(201).json({
    code: 201,
    message: 'User is succesfully created',
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { registration };
