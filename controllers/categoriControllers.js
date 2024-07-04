const categoryService = require("../services/categoriService");

// create Categories by Admin
module.exports.create = async (req, res) => {
  try {
    const admin = req.admin._id;
    const serviceResponse = await categoryService.create({
      admin,
      ...req.body,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update Categories by Admin
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const serviceResponse = await categoryService.update(id, updateData);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete Categories by Admin
module.exports.delete = async (req, res) => {
  try {
    const serviceResponse = await categoryService.delete(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// get one Category
module.exports.findOne = async (req, res) => {
  try {
    const serviceResponse = await categoryService.findOne(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// get All Category
module.exports.findAll = async (req, res) => {
  try {
    const serviceResponse = await categoryService.findAll(req.query);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
