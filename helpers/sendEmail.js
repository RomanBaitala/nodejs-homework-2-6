const nodemailer = require('nodemailer');
require('dotenv').config();

const { META_PASSWORD } = process.env;

const metaConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'roman.baitala@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(metaConfig);

const sendEmail = async data => {
  const email = { ...data, from: 'roman.baitala@meta.ua' };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
