const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().required().label("Description"),
  image: Joi.string().label("Image"),
});

module.exports.update = Joi.object({
  name: Joi.string().label("Name"),
  description: Joi.string().label("Description"),
  image: Joi.string().allow("").label("Image"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.categoryId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Category");
    })
    .required(),
});
