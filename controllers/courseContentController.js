const courseContentService = require("../services/courseContentService");

module.exports.create = async (req, res) => {
  try {
    const admin = req.admin._id;
    const serviceResponse = await courseContentService.create({
      admin,
      ...req.body,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const serviceResponse = await courseContentService.update(id, updateData);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findOne = async (req, res) => {
  try {
    const serviceResponse = await courseContentService.findOne(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const serviceResponse = await courseContentService.findAll(req.query);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const serviceResponse = await courseContentService.delete(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
