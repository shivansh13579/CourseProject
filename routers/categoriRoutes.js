const Router = require("express");
const categoryValidationSchema = require("../apiValidationSchemas/categoriValidationSchemas");
const categoryController = require("../controllers/categoriControllers");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const categoryRouter = Router();

categoryRouter.post(
  "/",
  joiSchemaValidation.validateBody(categoryValidationSchema.create),
  categoryController.create
);

categoryRouter.put(
  "/:id",
  joiSchemaValidation.validateBody(categoryValidationSchema.update),
  joiSchemaValidation.validateParams(categoryValidationSchema.categoryId),
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
  categoryController.delete
);

module.exports = categoryRouter;
