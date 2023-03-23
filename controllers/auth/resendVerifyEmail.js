const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const resendVerifyEmail = async (req, res) => {
  const { email, name } = req.params;
  const user = User.findOne({ email });

  if (!user) throw HttpError(404, 'Email not found');

  if (user.verify) throw HttpError(401, 'Email is already verified');

  const mail = {
    to: email,
    subject: 'Email confirmation',
    html: await createEmail({
      name,
      confirmationLink: `${BASE_URL}/api/auth/verify/${user.verificationCode}`,
      actionType: 'register',
    }),
  };

  await sendEmail(mail);

  res.status(201).json({
    message: 'Email was successfully sended',
  });
};

module.exports = { resendVerifyEmail };
