const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
    },
    description: {
      type: String,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    walletAmmount: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: Number,
    },
    referredBy: {
      type: Number,
    },
    profile: {},
    otp: { type: String, trim: true },
    otpExpiredAt: { type: Date, trim: true },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (ret, doc, option) => {
        delete doc.__v;
        delete doc.password;
        delete doc.otp;
        delete doc.otpExpiredAt;
        delete doc.jwtToken;
        delete doc.jwtTokenExpireAt;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
