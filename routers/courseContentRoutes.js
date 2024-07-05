const Router = require("express");
const courseContentValidationSchema = require("../apiValidationSchemas/courseContentValidationSchemas");
const courseContentController = require("../controllers/courseContentController");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const courseContentRouter = Router();

courseContentRouter.post(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateBody(courseContentValidationSchema.create),
  courseContentController.create
);

courseContentRouter.put(
  "/:id",
  joiSchemaValidation.validateParams(
    courseContentValidationSchema.courseContentId
  ),
  adminAuthentication,
  joiSchemaValidation.validateBody(courseContentValidationSchema.update),
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
  adminAuthentication,
  courseContentController.delete
);

module.exports = courseContentRouter;
