const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const Coupon = require("../models/couponModel");
const { couponMessage, commanMessage } = require("../constants/message");
const { formData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const existCoupon = await Coupon.findOne({
      couponCode: serviceData.couponCode,
    });

    if (existCoupon) {
      response.message = couponMessage.COUPON_EXISTS;
      response.errors.name = `${serviceData.couponCode} already exist`;
      return response;
    }

    const coupon = await Coupon.create(serviceData);

    await coupon.save();

    response.status = 200;
    response.message = couponMessage.COUPON_CREATED;
    response.body = formData(coupon);
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
    const coupon = await Coupon.findByIdAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!coupon) {
      response.message = couponMessage.COUPON_NOT_FOUND;
      response.errors.error = couponMessage.COUPON_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(coupon);
    response.message = couponMessage.COUPON_UPDATED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.findOne = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const coupon = await Coupon.findOne({ _id: serviceData.id });

    if (!coupon) {
      response.message = couponMessage.COUPON_NOT_FOUND;
      response.errors.error = couponMessage.COUPON_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(coupon);
    response.message = couponMessage.COUPON_FETCHED;
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
  status = true,
  searchQuery,
  applyFor,
  discountType,
}) => {
  const response = lodash.cloneDeep(serverResponse);

  const conditions = {
    isDeleted: false,
  };

  if (searchQuery) {
    const searchRegex = { $regex: searchQuery, $option: "i" };

    conditions.$or = [
      { couponCode: searchRegex },
      { applyFor: searchRegex },
      { discountType: searchRegex },
      { description: searchRegex },
    ];
  }

  if (status === "All") {
    delete conditions.status;
  } else {
    conditions.status = status === "false" ? false : true;
  }

  if (applyFor) {
    conditions.applyFor = applyFor;
  }

  if (discountType) {
    conditions.discountType = discountType;
  }

  try {
    const totalRecords = await Coupon.countDocuments(conditions);
    const totalPage = Math.ceil(totalRecords / parseInt(limit));

    const coupon = await Coupon.find(conditions)
      .populate({
        path: "category",
        select: "_id name",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!coupon) {
      response.message = couponMessage.COUPON_NOT_FOUND;
      response.errors.error = couponMessage.COUPON_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.body = formData(coupon);
    response.page = page;
    response.totalPage = totalPage;
    response.totalRecords = totalRecords;
    response.message = couponMessage.COUPON_FETCHED;
    return response;
  } catch (error) {}
};

module.exports.delete = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const coupon = await Coupon.findByIdAndUpdate(
      {
        _id: serviceData.id,
      },
      {
        isDeleted: true,
      }
    );

    if (!coupon) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = couponMessage.COUPON_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
