const Router = require("express");
const couponController = require("../controllers/couponController");
const couponValidationSchema = require("../apiValidationSchemas/couponValidationSchema");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const couponRouter = Router();

// createCoupon
couponRouter.post(
  "/",
  adminAuthentication,
  joiSchemaValidation.validateBody(couponValidationSchema.create),
  couponController.create
);

// updateCoupon
couponRouter.put(
  "/:id",
  adminAuthentication,
  joiSchemaValidation.validateBody(couponValidationSchema.update),
  joiSchemaValidation.validateParams(couponValidationSchema.couponId),
  couponController.update
);

couponRouter.get(
  "/:id",
  joiSchemaValidation.validateParams(couponValidationSchema.couponId),
  couponController.findOne
);

// Get all coupons
couponRouter.get(
  "/",
  joiSchemaValidation.validateQuery(couponValidationSchema.findAll),
  couponController.findAll
);

// validateCoupon
// couponRouter.get(
//   "/validate/:couponCode",
//   joiSchemaValidation.validateParams(couponValidationSchema.validateCoupon),
//   jwtValidation.validateCustomerToken,
//   couponController.findOne
// );

// Get coupon by ID

// Get coupon by ID
couponRouter.delete("/:id", adminAuthentication, couponController.delete);
module.exports = couponRouter;
