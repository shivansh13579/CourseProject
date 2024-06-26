const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const Course = require("../models/courseModel");
const { courseMessage, commanMessage } = require("../constants/message");
const { formData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const existCourse = await Course.findOne({
      name: serviceData.name,
      category: serviceData.category,
    });
    if (existCourse) {
      response.message = courseMessage.COURSE_ALREADY_EXIST;
      response.errors.name = `${serviceData.name} already exists`;
      return response;
    }

    const course = await Course.create(serviceData);

    await course.save();

    response.status = 200;
    response.message = courseMessage.COURSE_CREATED;
    response.body = formData(course);
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
    const course = await Course.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    console.log("course", course);

    if (!course) {
      response.errors.error = courseMessage.COURSE_NOT_FOUND;
      response.message = courseMessage.COURSE_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = courseMessage.COURSE_UPDATED;
    response.body = formData(course);
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
    const course = await Course.findOne({ _id: serviceData.id });

    if (!course) {
      response.errors.error = courseMessage.COURSE_NOT_FOUND;
      response.message = courseMessage.COURSE_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(course);
    response.message = courseMessage.COURSE_GET_SUCCESSFULLY;
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
    const totalRecords = await Course.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));
    const course = await Course.find(conditions)
      .populate({
        path: "category",
        select: "_id name",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!course) {
      response.message = courseMessage.COURSE_NOT_FOUND;
      response.errors.error = courseMessage.COURSE_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = courseMessage.ALL_COURSE_GET_SUCCESSFULLY;
    response.body = formData(course);
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
    const course = await Course.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!course) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = courseMessage.COURSE_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
