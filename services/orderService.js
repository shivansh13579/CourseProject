const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const Order = require("../models/orderModel");
const {
  commanMessage,
  orderMessage,
  userMessage,
} = require("../constants/message");
const { formData } = require("../utils/mongooseUtills");

// ************************USER-ORDER-SERVICE************************

// CREATE-ORDER
module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const existOrder = await Order.findOne({
      user: serviceData.user,
      course: serviceData.course,
      courseCategory: serviceData.courseCategory,
    });
    if (existOrder) {
      response.message = orderMessage.ORDER_ALREADY_EXIST;
      response.errors.courseName = `${serviceData.courseName} already exists`;
      return response;
    }

    const lastOrder = await Order.findOne().sort({ orderId: -1 });

    if (!lastOrder) {
      serviceData.orderId = 1000;
    } else {
      serviceData.orderId = lastOrder.orderId + 1;
    }

    const order = await Order.create(serviceData);
    console.log("order", order);

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

// getUserAllOrders

// getUserOrderDetails
module.exports.userOrderDetail = async ({
  limit = 10,
  page = 1,
  searchQuery,
  status = true,
  user,
}) => {
  const response = lodash.cloneDeep(serverResponse);

  let conditions = {
    isDeleted: false,
    user,
  };

  if (searchQuery) {
    const searchRegex = { $regex: searchQuery, $options: "i" };
    conditions.$or = [
      { orderStatus: searchRegex },
      { courseName: searchRegex },
    ];
  }

  if (status === "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  try {
    const totalRecords = await Order.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const existUser = await Order.find(conditions)
      .populate({
        path: "user",
        select: "_id name",
      })
      .populate({
        path: "course",
        select: "_id courseName",
      })
      .populate({
        path: "courseCategory",
        select: "_id name",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!existUser) {
      response.message = userMessage.USER_NOT_FOUND;
      response.errors.error = userMessage.USER_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = orderMessage.USER_ALL_ORDER;
    response.body = formData(existUser);
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

// cancelUserOrder
module.exports.cancelleByUser = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const orderCanclle = await Order.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        cancelledBy: "USER",
        cancelMessage: serviceData.cancelMessage,
        orderStatus: "CANCALLED",
      }
    );

    if (!orderCanclle) {
      response.message = orderMessage.ORDER_NOT_CANCELLED;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = orderMessage.ORDER_CANCELLED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

// *****************************ADMIN-ORDER-SERVICE********************

// updateOrder
module.exports.update = async (id, updateData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const order = await Order.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });

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

// getOrderById
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

// getAllOrders
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

    conditions.$or = [{ courseName: serchRegex }, { description: serchRegex }];
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
        path: "user",
        select: "_id",
      })
      .populate({
        path: "course",
        select: "_id",
      })
      .populate({
        path: "courseCategory",
        select: "_id",
      })
      .populate({
        path: "coupon",
        select: "_id",
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

// deleteOrder
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

module.exports.userCourse = async ({
  limit = 10,
  page = 1,
  searchQuery,
  status = true,
  user,
}) => {
  const response = lodash.cloneDeep(serverResponse);

  let conditions = {
    isDeleted: false,
    user,
  };

  if (searchQuery) {
    const searchRegex = { $regex: searchQuery, $options: "i" };
    conditions.$or = [
      { courseName: searchRegex },
      { description: searchRegex },
    ];
  }

  if (status === "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  try {
    const totalRecords = await Order.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const existUser = await Order.find(conditions)
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    console.log("existuser", existUser);

    if (!existUser) {
      response.message = userMessage.USER_NOT_FOUND;
      response.errors.error = userMessage.USER_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = userMessage.USER_ALL_COURSES;
    response.body = formData(existUser);
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
