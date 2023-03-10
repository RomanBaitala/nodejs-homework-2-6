const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const handleSchemaError = require('../helpers/handleSchemaError');
const Joi = require('joi');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailErrorMessage = "Email format doesn't match";

const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const phoneErrorMessage =
  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
      match: [emailRegex, emailErrorMessage],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      match: [phoneRegex, phoneErrorMessage],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name cannot be empty`,
    'any.required': `Name is required`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': emailErrorMessage,
    'string.empty': `Email cannot be empty`,
    'any.required': `Email is required`,
  }),
  phone: Joi.string().pattern(phoneRegex).required().messages({
    'string.pattern.base': phoneErrorMessage,
    'string.empty': `Phone cannot be empty`,
    'any.required': `Phone is required`,
  }),
});

const toggleFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contact = mongoose.model('contacts', contactSchema);

module.exports = {
  joi: {
    addSchema,
    toggleFavorite,
  },
  Contact,
};
