const Router = require("express");
const courseTopicsValidationSchema = require("../apiValidationSchemas/courseTopicsValidationSchemas");
const courseTopicsController = require("../controllers/courseTopicsController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const courseTopicsRouter = Router();

courseTopicsRouter.post(
  "/",
  joiSchemaValidation.validateBody(courseTopicsValidationSchema.create),
  courseTopicsController.create
);

courseTopicsRouter.put(
  "/:id",
  joiSchemaValidation.validateBody(courseTopicsValidationSchema.update),
  joiSchemaValidation.validateParams(
    courseTopicsValidationSchema.courseTopicId
  ),
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
  courseTopicsController.delete
);

module.exports = courseTopicsRouter;
