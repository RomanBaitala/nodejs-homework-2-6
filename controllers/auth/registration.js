const { User } = require('../../models/user');
const gravatar = require('gravatar');

const { HttpError } = require('../../helpers');

const registration = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  if (user) throw HttpError(409, `Email is already in use`);

  const newUser = await User.create({ ...req.body, avatarURL });

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
