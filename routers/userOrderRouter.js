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
  userAuthentication,
  joiSchemaValidation.validateQuery(orderValidationSchema.userOrderDetail),
  orderController.getUserAllOrderDetail
);

// getCustomersOrderDetails
orderRouter.get(
  "/:id",
  userAuthentication,
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.findOne
);

// cancelCustomersOrder
orderRouter.put(
  "/cancelleByUser/:id",
  userAuthentication,
  joiSchemaValidation.validateBody(orderValidationSchema.cancelleByUser),
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
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
