const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const Order = require("../models/orderModel");
const { commanMessage, orderMessage } = require("../constants/message");
const { formData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const existOrder = await Order.findOne({
      orderId: serviceData.orderId,
      courseCategory: serviceData.courseCategory,
      course: serviceData.course,
      user: serviceData.user,
      coupon: serviceData.coupon,
    });
    if (existOrder) {
      response.message = orderMessage.ORDER_ALREADY_EXIST;
      response.errors.name = `${serviceData.orderId} already exists`;
      return response;
    }

    const orderData = await Order.findOne().sort({ _id: -1 });

    if (!orderData) {
      serviceData.orderData = 1000;
    } else {
      serviceData.orderData = orderData.orderId + 1;
    }

    serviceData.courseSlug = serviceData.courseSlug
      .toLowerCase()
      .split(" ")
      .join("-");

    const order = await Order.create(serviceData);

    await order.save();

    response.status = 200;
    response.message = orderMessage.ORDER_CREATED;
    response.body = formData(order);
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
    const order = await Order.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    console.log("order", order);

    if (!order) {
      response.errors.error = orderMessage.ORDER_NOT_FOUND;
      response.message = orderMessage.ORDER_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = orderMessage.ORDER_UPDATED;
    response.body = formData(order);
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
    const order = await Order.findOne({ _id: serviceData.id });

    if (!order) {
      response.errors.error = orderMessage.ORDER_NOT_FOUND;
      response.message = orderMessage.ORDER_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(order);
    response.message = orderMessage.ORDER_GET_SUCCESSFULLY;
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
    const totalRecords = await Order.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));
    const order = await Order.find(conditions)
      .populate({
        path: "category",
        select: "_id name",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!order) {
      response.message = orderMessage.ORDER_NOT_FOUND;
      response.errors.error = orderMessage.ORDER_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = orderMessage.ALL_ORDER_GET_SUCCESSFULLY;
    response.body = formData(order);
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
    const order = await Order.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!order) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = orderMessage.ORDER_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
