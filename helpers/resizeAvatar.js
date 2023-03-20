const Jimp = require('jimp');
const fs = require('fs/promises');

const resizeAvatar = async (imgPath, destPath) => {
  const img = await Jimp.read(imgPath);
  img
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(60);

  await img.writeAsync(destPath);
  await fs.unlink(imgPath);
};

module.exports = resizeAvatar;
