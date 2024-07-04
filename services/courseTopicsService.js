const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const CourseTopics = require("../models/courseTopicsModel");
const { commanMessage, courseTopicMessage } = require("../constants/message");
const { formData, slug } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const existCourseTopics = await CourseTopics.findOne({
      name: serviceData.name,
      course: serviceData.course,
      admin: serviceData.admin,
    });
    if (existCourseTopics) {
      response.message = courseTopicMessage.COURSE_TOPICS_ALREADY_EXIST;
      response.errors.name = `${serviceData.name} already exists`;
      return response;
    }

    const createdSlug = slug(serviceData.name);

    const courseTopics = await CourseTopics.create({
      slug: createdSlug,
      ...serviceData,
    });

    await courseTopics.save();

    response.status = 200;
    response.message = courseTopicMessage.COURSE_TOPICS_CREATED;
    response.body = formData(courseTopics);
    return response;
  } catch (error) {
    response.message = commanMessage.SOMETHING_WENT_WRONG;
    response.errors = error;
    return response;
  }
};

module.exports.update = async (id, updateData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const courseTopics = await CourseTopics.findByIdAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
      }
    );

    if (!courseTopics) {
      response.errors.error = courseTopicMessage.COURSE_TOPICS_NOT_FOUND;
      response.message = courseTopicMessage.COURSE_TOPICS_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = courseTopicMessage.COURSE_TOPICS_UPDATED;
    response.body = formData(courseTopics);
    return response;
  } catch (error) {
    response.errors = error;
    response.message = error.message;
    return response;
  }
};

module.exports.findOne = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const courseTopics = await CourseTopics.findOne({ _id: serviceData.id });

    if (!courseTopics) {
      response.errors.error = courseTopicMessage.COURSE_TOPICS_NOT_FOUND;
      response.message = courseTopicMessage.COURSE_TOPICS_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(courseTopics);
    response.message = courseTopicMessage.COURSE_TOPICS_GET_SUCCESSFULLY;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.findAll = async ({
  limit = 10,
  page = 1,
  searchQuery,
  status = true,
  isCompleted = false,
}) => {
  const response = lodash.cloneDeep(serverResponse);

  let conditions = {
    isDeleted: false,
  };

  if (searchQuery) {
    const serchRegex = { $regex: searchQuery, $options: "i" };

    conditions.$or = [
      { name: serchRegex },
      { description: serchRegex },
      { timestamps: serchRegex },
    ];
  }

  if (status == "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  if (isCompleted) conditions.isCompleted = isCompleted;

  try {
    const totalRecords = await CourseTopics.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));
    const courseTopics = await CourseTopics.find(conditions)
      .populate({
        path: "course",
        select: "_id name",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!courseTopics) {
      response.message = courseTopicMessage.COURSE_TOPICS_NOT_FOUND;
      response.errors.error = courseTopicMessage.COURSE_TOPICS_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = courseTopicMessage.ALL_COURSE_TOPICS_GET_SUCCESSFULLY;
    response.body = formData(courseTopics);
    response.page = page;
    response.totalPages = totalPages;
    response.totalRecords = totalRecords;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.delete = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const courseTopics = await CourseTopics.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!courseTopics) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = courseTopicMessage.COURSE_TOPICS_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
