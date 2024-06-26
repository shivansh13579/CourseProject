const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.registerUserSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
  description: Joi.string().allow("").label("Description"),
  referralCode: Joi.number().allow("").label("Referal Code"),
});

module.exports.loginUserSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

module.exports.updateUserSchema = Joi.object({
  name: Joi.string().label(" Name"),
  email: Joi.string().email().label("Email"),
  password: Joi.string().min(6).label("Password"),
});

module.exports.forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
});

module.exports.verifyForgotPasswordOtp = Joi.object({
  otp: Joi.string().min(4).label("Otp"),
});

module.exports.updatePassword = Joi.object({
  password: Joi.string().required().min(6).label("Password"),
  conformPassword: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("Conformed Password"),
});

module.exports.UserId = Joi.object({
  id: Joi.custom((value, helpers) => {
    return validateObjectId(value, helpers, "User");
  }).required(),
});