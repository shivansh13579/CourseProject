const Router = require("express");
const courseContentValidationSchema = require("../apiValidationSchemas/courseContentValidationSchemas");
const courseContentController = require("../controllers/courseContentController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const courseContentRouter = Router();

courseContentRouter.post(
  "/",
  joiSchemaValidation.validateBody(courseContentValidationSchema.create),
  courseContentController.create
);

courseContentRouter.put(
  "/:id",
  joiSchemaValidation.validateBody(courseContentValidationSchema.update),
  joiSchemaValidation.validateParams(
    courseContentValidationSchema.courseContentId
  ),
  courseContentController.update
);

courseContentRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(
    courseContentValidationSchema.courseContentId
  ),
  courseContentController.findOne
);

courseContentRouter.get(
  "/",
  joiSchemaValidation.validateQuery(courseContentValidationSchema.findAll),
  courseContentController.findAll
);

courseContentRouter.delete(
  "/:id",
  joiSchemaValidation.validateParams(
    courseContentValidationSchema.courseContentId
  ),
  courseContentController.delete
);

module.exports = courseContentRouter;
