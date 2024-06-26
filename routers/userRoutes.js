const Router = require("express");
const userController = require("../controllers/userController");
const userAuthentication = require("../middleware/userAuthentication");
const userValidationSchema = require("../apiValidationSchemas/userValidationSchemas");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const userRouter = Router();

// register
userRouter.post(
  "/register",
  joiSchemaValidation.validateBody(userValidationSchema.registerUserSchema),
  userController.registerUser
);

// login
userRouter.post(
  "/login",
  joiSchemaValidation.validateBody(userValidationSchema.loginUserSchema),
  userController.loginUser
);

// update
userRouter.put(
  "/update/:id",
  userAuthentication,
  joiSchemaValidation.validateParams(userValidationSchema.UserId),
  joiSchemaValidation.validateBody(userValidationSchema.updateUserSchema),
  userController.updateUser
);

// forgotPassword
userRouter.post(
  "/forgotPassword",
  userAuthentication,
  joiSchemaValidation.validateBody(userValidationSchema.forgotPasswordSchema),
  userController.forgotPassword
);

// verifyForgotPasswordOtp
userRouter.post(
  "/verifyForgotPasswordOtp",
  userAuthentication,
  joiSchemaValidation.validateBody(
    userValidationSchema.verifyForgotPasswordOtp
  ),
  userController.verifyForgotPasswordOtp
);

// updatePassword
userRouter.put(
  "/updatePassword",
  userAuthentication,
  joiSchemaValidation.validateBody(userValidationSchema.updatePassword),
  userController.updatePassword
);

module.exports = userRouter;
