const adminService = require("../services/adminService");

module.exports.registerAdmin = async (req, res) => {
  try {
    const serviceResponse = await adminService.registerAdmin(req.body);
    console.log("server", serviceResponse);

    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const serviceResponse = await adminService.loginAdmin(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    updateData = req.body;
    const serviceResponse = await adminService.updateAdmin(id, updateData);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const serviceResponse = await adminService.forgotPassword(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const admin = req.admin;
    const serviceResponse = await adminService.verifyForgotPasswordOtp({
      admin,
      otp,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const serviceResponse = await adminService.updatePassword({
      admin: req.admin,
      ...req.body,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
