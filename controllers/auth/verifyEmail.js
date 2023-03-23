const { User } = require('../../models/user');
const { HttpError } = require('../../helpers');

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) throw HttpError(404, 'Email not found');

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: '',
  });
  res.status(200).json({
    message: 'Verification successful',
  });
};

module.exports = { verifyEmail };
