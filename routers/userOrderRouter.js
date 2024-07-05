const Router = require("express");
const orderValidationSchema = require("../apiValidationSchemas/orderValidationSchemas");
const orderController = require("../controllers/orderController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const userAuthentication = require("../middleware/userAuthentication");
const orderRouter = Router();

// createOrder
orderRouter.post(
  "/",
  userAuthentication,
  joiSchemaValidation.validateBody(orderValidationSchema.create),
  orderController.create
);

// getCustomersAllOrders
orderRouter.get(
  "/",
  joiSchemaValidation.validateQuery(orderValidationSchema.userOrderDetail),
  userAuthentication,
  orderController.getUserAllOrderDetail
);

// getCustomersOrderDetails
orderRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  userAuthentication,
  orderController.findOne
);

// cancelCustomersOrder
orderRouter.put(
  "/cancelleByUser/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  userAuthentication,
  joiSchemaValidation.validateBody(orderValidationSchema.cancelleByUser),
  orderController.cancelleByUser
);

// userOrder
// orderRouter.get(
//   "/userOrders",
//   AdminAuthentication,
//   joiSchemaValidation.validateQuery(orderValidationSchema.userOrderDetail),
//   orderController.userOrderDetail
// );

module.exports = orderRouter;
