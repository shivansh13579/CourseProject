const Router = require("express");
const categoryValidationSchema = require("../apiValidationSchemas/categoriValidationSchemas");
const categoryController = require("../controllers/categoriControllers");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const categoryRouter = Router();

categoryRouter.post(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateBody(categoryValidationSchema.create),
  categoryController.create
);

categoryRouter.put(
  "/:id",
  joiSchemaValidation.validateParams(categoryValidationSchema.categoryId),
  adminAuthentication,
  joiSchemaValidation.validateBody(categoryValidationSchema.update),
  categoryController.update
);

categoryRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(categoryValidationSchema.categoryId),
  categoryController.findOne
);

categoryRouter.get(
  "/",
  joiSchemaValidation.validateQuery(categoryValidationSchema.findAll),
  categoryController.findAll
);

categoryRouter.delete(
  "/:id",
  joiSchemaValidation.validateParams(categoryValidationSchema.categoryId),
  adminAuthentication,
  categoryController.delete
);

module.exports = categoryRouter;
