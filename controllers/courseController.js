const courseService = require("../services/courseService");

module.exports.create = async (req, res) => {
  try {
    const serviceResponse = await courseService.create(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const serviceResponse = await courseService.update(id, updateData);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findOne = async (req, res) => {
  try {
    const serviceResponse = await courseService.findOne(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const serviceResponse = await courseService.findAll(req.query);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const serviceResponse = await courseService.delete(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};