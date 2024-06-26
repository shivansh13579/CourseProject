const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const Category = require("../models/categoriModel");
const { categoryMessage, commanMessage } = require("../constants/message");
const { formData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const existCategory = await Category.findOne({ name: serviceData.name });
    if (existCategory) {
      response.message = categoryMessage.CATEGORY_ALREADY_EXIST;
      response.errors.name = `${serviceData.name} already exists`;
      return response;
    }

    const category = await Category.create(serviceData);

    await category.save();

    response.status = 200;
    response.message = categoryMessage.CATEGORY_CREATED;
    response.body = formData(category);
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
    const category = await Category.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!category) {
      response.errors.error = categoryMessage.CATEGORY_NOT_FOUND;
      response.message = categoryMessage.CATEGORY_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = categoryMessage.CATEGORY_UPDATED;
    response.body = formData(category);
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
    const category = await Category.findOne({ _id: serviceData.id });

    if (!category) {
      response.errors.error = categoryMessage.CATEGORY_NOT_FOUND;
      response.message = categoryMessage.CATEGORY_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(category);
    response.message = categoryMessage.CATEGORY_GET_SUCCESSFULLY;
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
    const totalRecords = await Category.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));
    const category = await Category.find(conditions)
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!category) {
      response.message = categoryMessage.CATEGORY_NOT_FOUND;
      response.errors.error = categoryMessage.CATEGORY_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = categoryMessage.ALL_CATEGORY_GET_SUCCESSFULLY;
    response.body = formData(category);
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
    const category = await Category.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!category) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = categoryMessage.CATEGORY_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
