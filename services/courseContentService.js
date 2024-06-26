const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const CourseContent = require("../models/courseContentModel");
const { courseContentMessage, commanMessage } = require("../constants/message");
const { formData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const existCourseContent = await CourseContent.findOne({
      name: serviceData.name,
      course: serviceData.course,
    });
    if (existCourseContent) {
      response.message = courseContentMessage.COURSE_CONTENT_ALREADY_EXIST;
      response.errors.name = `${serviceData.name} already exists`;
      return response;
    }

    const courseContent = await CourseContent.create(serviceData);

    await courseContent.save();

    response.status = 200;
    response.message = courseContentMessage.COURSE_CONTENT_CREATED;
    response.body = formData(courseContent);
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
    const courseContent = await CourseContent.findByIdAndUpdate(
      { _id: id },
      updateData,
      {
        new: true,
      }
    );

    if (!courseContent) {
      response.errors.error = courseContentMessage.COURSE_CONTENT_NOT_FOUND;
      response.message = courseContentMessage.COURSE_CONTENT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = courseContentMessage.COURSE_CONTENT_UPDATED;
    response.body = formData(courseContent);
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
    const courseContent = await CourseContent.findOne({ _id: serviceData.id });

    if (!courseContent) {
      response.errors.error = courseContentMessage.COURSE_CONTENT_NOT_FOUND;
      response.message = courseContentMessage.COURSE_CONTENT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(courseContent);
    response.message = courseContentMessage.COURSE_CONTENT_GET_SUCCESSFULLY;
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
}) => {
  const response = lodash.cloneDeep(serverResponse);

  let conditions = {
    isDeleted: false,
  };

  if (searchQuery) {
    const serchRegex = { $regex: searchQuery, $options: "i" };

    conditions.$or = [{ name: serchRegex }, { description: serchRegex }];
  }

  if (status == "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  try {
    const totalRecords = await CourseContent.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const courseContent = await CourseContent.find(conditions)
      .populate({
        path: "course",
        select: "_id name",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!courseContent) {
      response.message = courseContentMessage.COURSE_CONTENT_NOT_FOUND;
      response.errors.error = courseContentMessage.COURSE_CONTENT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = courseContentMessage.ALL_COURSE_CONTENT_GET_SUCCESSFULLY;
    response.body = formData(courseContent);
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
    const courseContent = await CourseContent.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!courseContent) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = courseContentMessage.COURSE_CONTENT_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};