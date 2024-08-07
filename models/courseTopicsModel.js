const mongoose = require("mongoose");

const courseTopicsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    completionPercent: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toObject: {
      transform: (ret, doc, option) => {
        delete doc.__v;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("courseTopics", courseTopicsSchema);
