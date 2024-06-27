const Joi = require("joi");

// createCoupon
module.exports.createCoupon = Joi.object({
  couponCode: Joi.string().required().trim(),
  applyFor: Joi.string()
    .required()
    .valid("NEW_USER", "EXISTING_USER", "ALL_USER")
    .label("Coupon Code"),
  discountType: Joi.string()
    .required()
    .valid("AMOUNT", "PERCENTAGE")
    .label("Discount Type"),

  discount: Joi.number().required().label("Discount"),
  numberOfUsesTimes: Joi.number().required().label("Number of uses times"),
  description: Joi.string().allow("").trim().label("Description"),
  minimumAmount: Joi.number().required().label("Minimum Amount"),
  image: Joi.string().allow("").label("Image"),
  //   startDate: Joi.date()
  //     .required()
  //     .less(
  //       Joi.ref("expiryDate", {
  //         adjust: (someField) => {
  //           return someField + 1;
  //         },
  //       })
  //     )
  //     .label("Start Date"),
  expiryDate: Joi.date().required().label("Expiry Date"),
});

// getAllCoupons
module.exports.getAllCoupons = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string(),
  searchQuery: Joi.string(),
  applyFor: Joi.string().valid("NEW_USER", "EXISTING_USER", "ALL_USER"),
  discountType: Joi.string().valid("AMOUNT", "PERCENTAGE"),
});

// updateCoupon
module.exports.updateCoupon = Joi.object({
  couponCode: Joi.string().trim().label("Coupon Code"),
  applyFor: Joi.string()
    .valid("NEW_USER", "EXISTING_USER", "ALL_USER")
    .label("Apply For"),
  discountType: Joi.string()
    .trim()
    .valid("AMOUNT", "PERCENTAGE")
    .label("Discount Type"),
  discount: Joi.number().label("Discount"),
  numberOfUsesTimes: Joi.number().label("Number of uses times"),
  description: Joi.string().allow("").trim().label("Description"),
  minimumAmount: Joi.number().label("Minimum Amount"),
  image: Joi.string().allow("").label("Image"),
  startDate: Joi.date().label("Start Date"),
  expiryDate: Joi.date().label("Expiry Date"),
  status: Joi.boolean().label("Status"),
  categories: Joi.array()
    .items(Joi.string().custom(customCallback))
    .label("Categories"),
  subCategories: Joi.array()
    .items(Joi.string().custom(customCallback))
    .label("Sub Categories"),
});
