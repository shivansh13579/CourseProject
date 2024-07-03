const Router = require("express");
const courseValidationSchema = require("../apiValidationSchemas/courseValidationSchemas");
const courseController = require("../controllers/courseController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const userAuthentication = require("../middleware/userAuthentication");
const courseRouter = Router();

courseRouter.post(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateBody(courseValidationSchema.create),
  courseController.create
);

courseRouter.put(
  "/:id",
  adminAuthentication,
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
  adminAuthentication,
  joiSchemaValidation.validateParams(courseValidationSchema.courseId),
  courseController.delete
);

// orderRouter.get(
//   "/userCourse",
//   userAuthentication,
//   joiSchemaValidation.validateQuery(courseValidationSchema.userCourse),
//   courseController.userCourse
// );

module.exports = courseRouter;
