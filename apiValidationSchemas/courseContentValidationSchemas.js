const Joi = require("joi");
const { validateObjectId } = require("../utils/mongooseUtills");

module.exports.create = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().label("Description"),
  course: Joi.string().label("Course"),
  image: Joi.string().label("Course"),
  courseTopics: Joi.string().label("Course Topics"),
  contentUrl: Joi.string().label("Content Url"),
  contentType: Joi.string().label("Content Type"),
  slug: Joi.string().label("Slug"),
});

module.exports.update = Joi.object({
  name: Joi.string().label("Name"),
  description: Joi.string().label("Description"),
  image: Joi.string().label("Course"),
  contentUrl: Joi.string().label("Content Url"),
  contentType: Joi.string().label("Content Type"),
});

module.exports.findAll = Joi.object({
  limit: Joi.string().label("Limit"),
  page: Joi.string().label("Page"),
  status: Joi.string().label("Status"),
  searchQuery: Joi.string().label("searchQuery"),
  isCompleted: Joi.string().label("Is Completed"),
  completionPercent: Joi.string().label("Completion Percent"),
});

module.exports.courseContentId = Joi.object({
  id: Joi.string()
    .custom((value, helpers) => {
      return validateObjectId(value, helpers, "Course Content");
    })
    .required(),
});
