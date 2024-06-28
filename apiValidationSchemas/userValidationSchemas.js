const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.registerUserSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
  description: Joi.string().allow("").label("Description"),
  mobile: Joi.number().allow("").label("Mobile"),
  referralCode: Joi.number().allow("").label("Referal Code"),
  profile: Joi.number().allow("").label("Profile"),
  referredBy: Joi.number().allow("").label("Referred By"),
  walletAmmount: Joi.number().allow("").label("Wallet Ammount"),
  parent: Joi.number().allow("").label("Parent"),
});

module.exports.loginUserSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
});

module.exports.updateUserSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().min(6).label("Password"),
  description: Joi.string().allow("").label("Description"),
  mobile: Joi.number().allow("").label("Mobile"),
  referralCode: Joi.number().allow("").label("Referal Code"),
  profile: Joi.number().allow("").label("Profile"),
  referredBy: Joi.number().allow("").label("Referred By"),
  walletAmmount: Joi.number().allow("").label("Wallet Ammount"),
  parent: Joi.number().allow("").label("Parent"),
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
