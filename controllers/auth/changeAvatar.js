const path = require('path');
const fs = require('fs/promises');
const { User } = require('../../models/user');
const { resizeAvatar } = require('../../helpers');
const { HttpError } = require('../../helpers');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const changeAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload } = req.file;
  const filename = `${_id}`;
  const resultUpload = path.join(avatarDir, filename);
  try {
    await resizeAvatar(tempUpload, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.status(201).json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    HttpError(500, 'Error in writing file');
  }
};

module.exports = { changeAvatar };
