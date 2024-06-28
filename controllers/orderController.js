const orderService = require("../services/orderService");

module.exports.create = async (req, res) => {
  try {
    const serviceResponse = await orderService.create(req.body);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

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

module.exports.findOne = async (req, res) => {
  try {
    const serviceResponse = await orderService.findOne(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const serviceResponse = await orderService.findAll(req.query);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const serviceResponse = await orderService.delete(req.params);
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ////////////
// validateCoupon
// module.exports.validateCoupon = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await couponService.validateCoupon(req.params);
//     response.status = 200;
//     response.message = constants.couponMessage.COUPON_VERIFIED;
//     response.body = serviceResponse;
//   } catch (error) {
//     response.message = error.message;
//     console.log(
//       `Something went Wrong Controller : couponontroller: validateCoupon`,
//       error.message
//     );
//   }
//   res.status(response.status).send(response);
// };
