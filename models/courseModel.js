const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    salePrice: {
      type: String,
      default: 0,
    },
    mrp: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    image: {},
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (ret, doc, option) => {
        delete doc.__v;
        doc.isDeleted;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("course", courseSchema);