const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  mrp: Joi.string().allow("").label("Mrp"),
  category: Joi.string().allow("").label("Category"),
  salePrice: Joi.string().allow("").label("SalePrice"),
});

module.exports.update = Joi.object({
  name: Joi.string().allow("").label("Name"),
  description: Joi.string().allow("").label("Description"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.courseId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Course");
    })
    .required(),
});
