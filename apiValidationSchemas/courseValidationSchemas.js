const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  courseName: Joi.string().required().label("Course Name"),
  description: Joi.string().allow("").label("Description"),
  courseSlug: Joi.string().allow("").label("Course Slug"),
  courseMrp: Joi.string().required().label("Mrp"),
  category: Joi.string().allow("").label("Category"),
  salePrice: Joi.string().allow("").label("SalePrice"),
  slug: Joi.string().allow("").label("Slug"),
});

module.exports.update = Joi.object({
  name: Joi.string().allow("").label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().allow("").label("Slug"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().label("Limit"),
  page: Joi.string().label("Page"),
  status: Joi.string().label("Status"),
  searchQuery: Joi.string().label("searchQuery"),
});

module.exports.userCourse = Joi.object({
  limit: Joi.string().label("Limit"),
  page: Joi.string().label("Page"),
  status: Joi.string().label("Status"),
  searchQuery: Joi.string().label("searchQuery"),
});

module.exports.courseId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Course");
    })
    .required(),
});
