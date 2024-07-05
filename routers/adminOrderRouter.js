const Router = require("express");
const orderValidationSchema = require("../apiValidationSchemas/orderValidationSchemas");
const orderController = require("../controllers/orderController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const orderRouter = Router();

// updateOrder
orderRouter.put(
  "/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  adminAuthentication,
  joiSchemaValidation.validateBody(orderValidationSchema.update),
  orderController.update
);

// getOrderById
orderRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  adminAuthentication,
  orderController.findOne
);

// getAllOrders
orderRouter.get(
  "/",
  joiSchemaValidation.validateQuery(orderValidationSchema.findAll),
  adminAuthentication,
  orderController.findAll
);

// deleteOrder
orderRouter.delete(
  "/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  adminAuthentication,
  orderController.delete
);

module.exports = orderRouter;
