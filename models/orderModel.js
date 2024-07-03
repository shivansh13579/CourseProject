const mongoose = require("mongoose");

const orderModelSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    courseName: {
      type: String,
      required: true,
    },
    courseSlug: {
      type: String,
    },
    courseMrp: {
      type: Number,
      required: true,
    },
    courseSellingPrice: {
      type: Number,
    },
    courseCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    courseQuantity: {
      type: Number,
      default: "",
    },
    courseImage: {
      type: String,
      default: "",
    },
    courseDescription: {
      type: String,
      default: "",
    },

    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coupon",
    },
    discountWithCoupon: {
      type: Number,
      default: 0,
    },
    subtotalAmount: {
      type: Number,
      default: "",
    },
    totalAmount: {
      type: Number,
      default: "",
    },
    paymentMethod: {
      type: String,
      default: "online",
      enum: ["online"],
    },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Credit", "Failed"],
    },

    paymentId: {
      type: String,
      default: "",
    },
    paymentRequestId: {
      type: String,
      default: "",
    },

    cancelledBy: {
      type: String,
      enum: ["USER", "ADMIN", ""],
      default: "",
    },
    cancelMessage: {
      type: String,
      trim: true,
      default: "",
    },
    orderStatus: {
      type: String,
      default: "PURCHASED",
      enum: ["PURCHASED", "CANCALLED"],
    },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        ret.id = ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("order", orderModelSchema);
