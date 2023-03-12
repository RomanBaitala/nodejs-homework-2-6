const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleSchemaError, hashPassword } = require('../helpers');

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailErrorMessage = "Email format doesn't match";

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,32}$/;
const passwordErrorMessage =
  'Your password must be at least 6 characters long, contain at least one number and contains with uppercase and lowercase letters.';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set username'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('save', hashPassword);

userSchema.post('save', handleSchemaError);

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': `Name cannot be empty`,
    'any.required': `Name is required`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': emailErrorMessage,
    'string.empty': `Email cannot be empty`,
    'any.required': `Email is required`,
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': passwordErrorMessage,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    'string.pattern.base': emailErrorMessage,
    'string.empty': `Email cannot be empty`,
    'any.required': `Email is required`,
  }),
  password: Joi.string().pattern(passwordRegex).required().messages({
    'string.pattern.base': passwordErrorMessage,
    'string.empty': `Password cannot be empty`,
    'any.required': `Password is required`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  schemas,
  User,
};
