const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().required().label("Description"),
  course: Joi.string().required().label("Course"),
});

module.exports.update = Joi.object({
  name: Joi.string().label("Name"),
  description: Joi.string().label("Description"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().label("Limit"),
  page: Joi.string().label("Page"),
  status: Joi.string().label("Status"),
  searchQuery: Joi.string().label("searchQuery"),
  isCompleted: Joi.string().label("Is Completed"),
  completionPercent: Joi.string().label("Completed Percent"),
});

module.exports.courseTopicId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Course Topics");
    })
    .required(),
});
