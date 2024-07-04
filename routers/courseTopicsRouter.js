const Router = require("express");
const courseTopicsValidationSchema = require("../apiValidationSchemas/courseTopicsValidationSchemas");
const courseTopicsController = require("../controllers/courseTopicsController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const courseTopicsRouter = Router();

courseTopicsRouter.post(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateBody(courseTopicsValidationSchema.create),
  courseTopicsController.create
);

courseTopicsRouter.put(
  "/:id",
  joiSchemaValidation.validateParams(
    courseTopicsValidationSchema.courseTopicId
  ),
  adminAuthentication,
  joiSchemaValidation.validateBody(courseTopicsValidationSchema.update),
  courseTopicsController.update
);

courseTopicsRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(
    courseTopicsValidationSchema.courseTopicId
  ),
  courseTopicsController.findOne
);

courseTopicsRouter.get(
  "/",
  joiSchemaValidation.validateQuery(courseTopicsValidationSchema.findAll),
  courseTopicsController.findAll
);

courseTopicsRouter.delete(
  "/:id",
  joiSchemaValidation.validateParams(
    courseTopicsValidationSchema.courseTopicId
  ),
  adminAuthentication,
  courseTopicsController.delete
);

module.exports = courseTopicsRouter;
