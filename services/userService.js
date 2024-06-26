const User = require("../models/userModel");
const serverResponse = require("../constants/serverResponse");
const lodash = require("lodash");
const { userMessage, commanMessage } = require("../constants/message");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const { formData } = require("../utils/mongooseUtills");

module.exports.registerUser = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    // Check if the admin already exists
    const user = await User.findOne({ email: serviceData.email });

    if (user) {
      response.status = 400;
      response.message = commanMessage.VALIDATION_FAILED;
      response.errors = { email: userMessage.EMAIL_ALREADY_EXIST };
      return response;
    }

    // Hash the password
    serviceData.password = await bcrypt.hash(serviceData.password, 10);

    const userData = await User.findOne().sort({ _id: -1 });

    if (!userData) {
      let num = 1000;
      serviceData.referralCode = num;
    } else {
      serviceData.referralCode = userData.referralCode + 1;
    }

    // Create and save the new admin
    const customerUser = await User.create(serviceData);

    await customerUser.save();

    response.status = 200;
    response.message = userMessage.USER_CREATED;
    response.body = formData(customerUser);
    return response;
  } catch (error) {
    response.message = commanMessage.SOMETHING_WENT_WRONG;
    response.errors = error;
    return response;
  }
};

module.exports.loginUser = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      response.status = 400;
      response.message = userMessage.EMAIL_AND_PASSWORD_NOT_MATCH;
      response.errors = {
        email: commanMessage.EMAIL_NOT_MATCHED,
        password: commanMessage.PASSWORD_NOT_MATCHED,
      };
      return response;
    }

    const isPasswordValid = await bcrypt.compare(
      serviceData.password,
      user.password
    );

    if (!isPasswordValid) {
      response.message = commanMessage.PASSWORD_NOT_MATCHED;
      response.errors = { password: commanMessage.PASSWORD_NOT_MATCHED };
      return response;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    response.status = 200;
    response.message = userMessage.USER_LOGIN_SUCCESS;
    response.body = { ...formData(user), token };
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.updateUser = async function (id, updateData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    // update admin details
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      response.status = 400;
      response.errors.error = userMessage.USER_NOT_FOUND;
      return response;
    }

    const userUpdate = await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    if (userUpdate) {
      response.status = 200;
      response.message = userMessage.USER_UPDATED;
      response.body = { ...formData(userUpdate), token };
      return response;
    } else {
      response.status = 400;
      response.errors.error = userMessage.USER_NOT_UPDATED;
      response.message = userMessage.USER_NOT_UPDATED;
      return response;
    }
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.forgotPassword = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const user = await User.findOne({ email: serviceData.email });

    if (!user) {
      response.errors = { email: commanMessage.EMAIL_NOT_MATCHED };
      response.message = commanMessage.EMAIL_NOT_MATCHED;
      return response;
    }

    const otp = Math.floor(Math.random() * (9999 - 1000));

    user.otp = otp.toString();
    user.otpExpiredAt = Date.now() + 15 * 60 * 1000;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await user.save();
    const emailOpt = sendEmail.sendMail(user.email, otp);

    if (!emailOpt) {
      response.errors = { otp: userMessage.OTP_RESEND };
      response.message = userMessage.OTP_RESEND;
      return response;
    }

    response.status = 200;
    response.body = { ...formData(user), token };
    return response;
  } catch (error) {
    response.errors.error = error.message;
    return response;
  }
};

module.exports.verifyForgotPasswordOtp = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const user = await User.findOne({
      _id: serviceData.user._id,
      otp: serviceData.otp,
      otpExpiredAt: { $gt: Date.now() },
    });

    if (!user) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { error: commanMessage.INVALID_ID };
      return response;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    await user.save();

    response.status = 200;
    response.message = commanMessage.VERIFY_OTP;
    response.body = { ...formData(user), token };
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.updatePassword = async function (serviceData) {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const user = await User.findById(serviceData.user._id);

    if (!user) {
      response.message = commanMessage.INVALID_ID;
      return response;
    }

    const hashedpassword = await bcrypt.hash(serviceData.password, 10);

    user.password = hashedpassword;
    const updateData = await user.save();
    if (!updateData) {
      response.message = commanMessage.PASSWORD_NOT_UPDATED;
      response.errors.error = commanMessage.PASSWORD_NOT_UPDATED;
      return response;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });

    response.status = 200;
    response.message = commanMessage.PASSWORD_UPDATED;
    response.body = { ...formData(updateData), token };
    return response;
  } catch (error) {
    response.errors.error = error.message;
    response.message = error.message;
    return response;
  }
};
