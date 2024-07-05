const { message } = require("../constants/serverResponse");
const orderService = require("../services/orderService");

// **************************************CUSTOMER-ORDER*******************************

module.exports.create = async (req, res) => {
  try {
    const user = req.user._id;
    const serviceResponse = await orderService.create({ user, ...req.body });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// getUserOrderDetails
module.exports.getUserOrderDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderId = req.params.id;
    const serviceResponse = await orderService.getUserOrderDetails({
      userId,
      orderId,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//getUserAllOrders
module.exports.getUserAllOrderDetail = async (req, res) => {
  try {
    const user = req.user._id;
    const serviceResponse = await orderService.getUserAllOrderDetail({
      user,
      ...req.query,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//cancelUserOrder
module.exports.cancelleByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceResponse = await orderService.cancelleByUser({
      id,
      ...req.body,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ***********************ADMIN-ORDER**********************************

// updateOrder
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const serviceResponse = await orderService.update(id, updateData);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// getOrderById
module.exports.findOne = async (req, res) => {
  try {
    const serviceResponse = await orderService.findOne(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// getAllOrders
module.exports.findAll = async (req, res) => {
  try {
    const serviceResponse = await orderService.findAll(req.query);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// delete Order
module.exports.delete = async (req, res) => {
  try {
    const serviceResponse = await orderService.delete(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//  ******************UserCourse**********************
module.exports.userCourse = async (req, res) => {
  try {
    const user = req.user._id;
    const serviceResponse = await orderService.userCourse({
      user,
      ...req.query,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
