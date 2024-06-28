const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");
// createCoupon
module.exports.create = Joi.object({
  couponCode: Joi.string().allow("").trim(),
  applyFor: Joi.string()
    .allow("")
    .valid("NEW_USER", "EXISTING_USER", "ALL_USER")
    .label("Coupon Code"),
  discountType: Joi.string()
    .allow("")
    .valid("AMOUNT", "PERCENTAGE")
    .label("Discount Type"),

  discount: Joi.number().allow("").label("Discount"),
  numberOfUsesTimes: Joi.number().allow("").label("Number of uses times"),
  description: Joi.string().allow("").trim().label("Description"),
  minimumAmount: Joi.number().allow("").label("Minimum Amount"),
  image: Joi.string().allow("").label("Image"),
  startDate: Joi.date()
    .allow("")
    .less(
      Joi.ref("expiryDate", {
        adjust: (someField) => {
          return someField + 1;
        },
      })
    )
    .label("Start Date"),
  expiryDate: Joi.date().allow("").label("Expiry Date"),
});

// getAllCoupons
module.exports.findAll = Joi.object({
  page: Joi.string(),
  limit: Joi.string(),
  status: Joi.string(),
  searchQuery: Joi.string(),
  applyFor: Joi.string().valid("NEW_USER", "EXISTING_USER", "ALL_USER"),
  discountType: Joi.string().valid("AMOUNT", "PERCENTAGE"),
});

// updateCoupon
module.exports.update = Joi.object({
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
  //   categories: Joi.array()
  //     .items(Joi.string().custom(customCallback))
  //     .label("Categories"),
  //   subCategories: Joi.array()
  //     .items(Joi.string().custom(customCallback))
  //     .label("Sub Categories"),
});

module.exports.couponId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Coupon");
    })
    .required(),
});
