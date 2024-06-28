const Router = require("express");
const orderValidationSchema = require("../apiValidationSchemas/orderValidationSchemas");
const orderController = require("../controllers/orderController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const orderRouter = Router();

orderRouter.post(
  "/",
  joiSchemaValidation.validateBody(orderValidationSchema.create),
  orderController.create
);

orderRouter.put(
  "/:id",
  joiSchemaValidation.validateBody(orderValidationSchema.update),
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.update
);

orderRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.findOne
);

orderRouter.get(
  "/",
  joiSchemaValidation.validateQuery(orderValidationSchema.findAll),
  orderController.findAll
);

orderRouter.delete(
  "/:id",
  joiSchemaValidation.validateParams(orderValidationSchema.orderId),
  orderController.delete
);

module.exports = orderRouter;
