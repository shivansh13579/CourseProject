const Router = require("express");
const courseValidationSchema = require("../apiValidationSchemas/courseValidationSchemas");
const courseController = require("../controllers/courseController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const courseRouter = Router();

courseRouter.post(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateBody(courseValidationSchema.create),
  courseController.create
);

courseRouter.put(
  "/:id",
  joiSchemaValidation.validateParams(courseValidationSchema.courseId),
  adminAuthentication,
  joiSchemaValidation.validateBody(courseValidationSchema.update),
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
  adminAuthentication,
  courseController.delete
);

module.exports = courseRouter;
