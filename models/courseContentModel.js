const mongoose = require("mongoose");

const courseContentSchema = new mongoose.Schema(
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
    image: {},
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    courseTopics: {
      type: mongoose.Types.ObjectId,
      ref: "courseTopics",
    },
    contentUrl: {
      type: String,
    },
    contentType: {
      type: String,
      enum: ["image", "video", "pdf"],
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
        doc.isDeleted;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("courseContent", courseContentSchema);
