const fs = require('fs/promises');
const Handlebars = require('handlebars');
const path = require('path');

const mailTemplatePath = path.join(__dirname, '../templates/emailConfirmation.hbs');

const createEmail = async ({ name, confirmationLink}) => {
  const emailTemplate = await fs.readFile(mailTemplatePath, 'utf-8');
  const template = Handlebars.compile(emailTemplate);
  return template({ name, confirmationLink});
};

module.exports = createEmail;
