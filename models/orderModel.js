const mongoose = require("mongoose");

const orderModelSchema = new mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
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
    },
    courseSlug: {
      type: String,
    },
    mrp: {
      type: Number,
    },
    sellingPrice: {
      type: Number,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    quantity: {
      type: Number,
      required: true,
    },
    defaultImage: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },

    //payment

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
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      default: "",
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

    orderStatus: {
      type: String,
      enum: ["ORDERPLACED", "CONFIRMED", "DELIVERED", "CANCELLED"],
      default: "ORDERPLACED",
    },
    cancelledBy: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    cancelMessage: {
      type: String,
      trim: true,
      default: "",
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
