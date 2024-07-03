const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  courseCategory: Joi.string().required().label("Course Category"),
  course: Joi.string().required().label("Course"),
  coupon: Joi.string().allow("").label("Coupon"),
  courseName: Joi.string().required().label("Course Name"),
  slug: Joi.string().allow("").label("Slug"),
  courseMrp: Joi.string().required().label("Course Mrp"),
  courseSellingPrice: Joi.string().allow("").label("Course SellingPrice"),
  courseQuantity: Joi.string().required().label("Course Quantity"),
  courseImage: Joi.string().allow("").label("Course Image"),
  discountWithCoupon: Joi.string().allow("").label("Discount With Coupon"),
  subtotalAmount: Joi.string().required().label("Subtotal Amount"),
  totalAmount: Joi.string().required().label("Total Amount"),
  paymentMethod: Joi.string().allow("").label("Payment Method"),
  paymentStatus: Joi.string().allow("").label("Payment Status"),
  paymentId: Joi.string().allow("").label("Payment Id"),
  paymentRequestId: Joi.string().allow("").label("Payment RequestId"),
  cancelledBy: Joi.string().allow("").label("Cancelled By"),
});

module.exports.update = Joi.object({
  paymentStatus: Joi.string().label("Payment Status"),
  cancelledBy: Joi.string().label("Cancelled By"),
  cancelMessage: Joi.string().label("Cancel Message"),
});

module.exports.cancelleByUser = Joi.object({
  cancelMessage: Joi.string().label("Cancel Message"),
});

// module.exports.cancelleByAdmin = Joi.object({
//   cancelMessage: Joi.string().label("Cancel Message"),
// });

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.userCourse = Joi.object({
  limit: Joi.string().label("Limit"),
  page: Joi.string().label("Page"),
  status: Joi.string().label("Status"),
  searchQuery: Joi.string().label("searchQuery"),
});

module.exports.userOrderDetail = Joi.object({
  limit: Joi.string().label("Limit"),
  page: Joi.string().label("Page"),
  status: Joi.string().label("Status"),
  searchQuery: Joi.string().label("searchQuery"),
  orderStatus: Joi.string().label("Order Status"),
  courseName: Joi.string().label("Course Name"),
});

module.exports.orderId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Order");
    })
    .required(),
});
