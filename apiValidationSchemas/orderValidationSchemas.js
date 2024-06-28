const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  orderId: Joi.string().required().label("Name"),
  courseCategory: Joi.string().allow("").label("SalePrice"),
  course: Joi.string().allow("").label("Description"),
  user: Joi.string().allow("").label("Description"),
  coupon: Joi.string().allow("").label("Description"),
  courseName: Joi.string().allow("").label("Description"),
  courseSlug: Joi.string().required().label("Name"),
  courseMrp: Joi.string().allow("").label("Mrp"),
  courseSellingPrice: Joi.string().allow("").label("Category"),
  courseQuantity: Joi.string().allow("").label("Category"),
  courseImage: Joi.string().allow("").label("Category"),
  discountWithCoupon: Joi.string().allow("").label("Category"),
  discountWithCoupon: Joi.string().allow("").label("Category"),
  subtotalAmount: Joi.string().allow("").label("Category"),
  totalAmount: Joi.string().allow("").label("Category"),
  totalAmount: Joi.string().allow("").label("Category"),
  paymentMethod: Joi.string().allow("").label("Category"),
  paymentStatus: Joi.string().allow("").label("Category"),
  paymentId: Joi.string().allow("").label("Category"),
  paymentRequestId: Joi.string().allow("").label("Category"),
  cancelledBy: Joi.string().allow("").label("Category"),
});

module.exports.update = Joi.object({
  orderId: Joi.string().required().label("Name"),
  courseCategory: Joi.string().allow("").label("SalePrice"),
  course: Joi.string().allow("").label("Description"),
  user: Joi.string().allow("").label("Description"),
  coupon: Joi.string().allow("").label("Description"),
  courseName: Joi.string().allow("").label("Description"),
  courseSlug: Joi.string().required().label("Name"),
  courseMrp: Joi.string().allow("").label("Mrp"),
  courseSellingPrice: Joi.string().allow("").label("Category"),
  courseQuantity: Joi.string().allow("").label("Category"),
  courseImage: Joi.string().allow("").label("Category"),
  discountWithCoupon: Joi.string().allow("").label("Category"),
  discountWithCoupon: Joi.string().allow("").label("Category"),
  subtotalAmount: Joi.string().allow("").label("Category"),
  totalAmount: Joi.string().allow("").label("Category"),
  totalAmount: Joi.string().allow("").label("Category"),
  paymentMethod: Joi.string().allow("").label("Category"),
  paymentStatus: Joi.string().allow("").label("Category"),
  paymentId: Joi.string().allow("").label("Category"),
  paymentRequestId: Joi.string().allow("").label("Category"),
  cancelledBy: Joi.string().allow("").label("Category"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.orderId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Order");
    })
    .required(),
});
