const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  course: Joi.string().allow("").label("Course"),
  slug: Joi.string().allow("").label("Slug"),
});

module.exports.update = Joi.object({
  name: Joi.string().allow("").label("Name"),
  description: Joi.string().allow("").label("Description"),
  slug: Joi.string().allow("").label("Slug"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().allow("").label("Limit"),
  page: Joi.string().allow("").label("Page"),
  status: Joi.string().allow("").label("Status"),
  searchQuery: Joi.string().allow("").label("searchQuery"),
});

module.exports.courseTopicId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Course Topics");
    })
    .required(),
});
