const userService = require("../services/userService");

module.exports.registerUser = async (req, res) => {
  try {
    const serviceResponse = await userService.registerUser(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const serviceResponse = await userService.loginUser(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    updateData = req.body;
    const serviceResponse = await userService.updateUser(id, updateData);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const serviceResponse = await userService.forgotPassword(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = req.user;
    const serviceResponse = await userService.verifyForgotPasswordOtp({
      user,
      otp,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const serviceResponse = await userService.updatePassword({
      user: req.user,
      ...req.body,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
