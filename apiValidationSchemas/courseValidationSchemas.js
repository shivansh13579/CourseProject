const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  courseName: Joi.string().required().label("Course Name"),
  description: Joi.string().label("Description"),
  courseSlug: Joi.string().label("Course Slug"),
  courseMrp: Joi.string().required().label("Mrp"),
  category: Joi.string().label("Category"),
  salePrice: Joi.string().label("SalePrice"),
  slug: Joi.string().label("Slug"),
  image: Joi.string().label("Image"),
});

module.exports.update = Joi.object({
  courseName: Joi.string().label("Course Name"),
  description: Joi.string().label("Description"),
  courseSlug: Joi.string().label("Course Slug"),
  courseMrp: Joi.string().label("Mrp"),
  category: Joi.string().label("Category"),
  salePrice: Joi.string().label("SalePrice"),
  slug: Joi.string().label("Slug"),
  image: Joi.string().label("Image"),
});

module.exports.findAll = Joi.object({
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
