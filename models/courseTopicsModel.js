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
        doc.isDeleted;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("courseTopics", courseTopicsSchema);
