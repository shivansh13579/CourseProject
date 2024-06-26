const Router = require("express");
const courseValidationSchema = require("../apiValidationSchemas/courseValidationSchemas");
const courseController = require("../controllers/courseController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const courseRouter = Router();

courseRouter.post(
  "/",
  joiSchemaValidation.validateBody(courseValidationSchema.create),
  courseController.create
);

courseRouter.put(
  "/:id",
  joiSchemaValidation.validateBody(courseValidationSchema.update),
  joiSchemaValidation.validateParams(courseValidationSchema.courseId),
  courseController.update
);

courseRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(courseValidationSchema.courseId),
  courseController.findOne
);

courseRouter.get(
  "/",
  joiSchemaValidation.validateQuery(courseValidationSchema.findAll),
  courseController.findAll
);

courseRouter.delete(
  "/:id",
  joiSchemaValidation.validateParams(courseValidationSchema.courseId),
  courseController.delete
);

module.exports = courseRouter;
