const { User } = require('../../models/user');
const gravatar = require('gravatar');
const { uid } = require('uid');
require('dotenv').config();

const { BASE_URL } = process.env;

const { HttpError, sendEmail, createEmail } = require('../../helpers');

const registration = async (req, res) => {
  const { email, name } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);
  const verificationCode = uid();

  if (user) throw HttpError(409, `Email is already in use`);

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    verificationCode,
  });

  const mail = {
    to: email,
    subject: 'Email confirmation',
    html: await createEmail({
      name,
      confirmationLink: `${BASE_URL}/api/auth/verify/${verificationCode}`,
    }),
  };

  await sendEmail(mail);

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
