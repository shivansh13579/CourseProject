const Router = require("express");
const orderValidationSchema = require("../apiValidationSchemas/orderValidationSchemas");
const orderController = require("../controllers/orderController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const orderRouter = Router();

// updateOrder
orderRouter.put(
  "/:id",
  adminAuthentication,
  joiSchemaValidation.validateBody(orderValidationSchema.update),
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.update
);

// getOrderById
orderRouter.get(
  "/:id",
  adminAuthentication,
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.findOne
);

// getAllOrders
orderRouter.get(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateQuery(orderValidationSchema.findAll),
  orderController.findAll
);

// deleteOrder
orderRouter.delete(
  "/:id",
  adminAuthentication,
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.delete
);

module.exports = orderRouter;
