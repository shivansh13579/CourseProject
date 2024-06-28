const mongoose = require("mongoose");

//validateObjectId
module.exports.validateObjectId = (value, helpers, errorMessage) => {
  const valid = mongoose.Types.ObjectId.isValid(value);
  return !valid ? helpers.message(`Invalid ${errorMessage} ID`) : value;
};

module.exports.formData = (data) => {
  if (!data) {
    return data;
  }

  if (Array.isArray(data)) {
    let filteredArray = [];
    for (let d of data) {
      filteredArray.push(d.toObject());
    }
    return filteredArray;
  } else {
    return data.toObject();
  }
};

module.exports.slug = (data) => {
  return data.toLowerCase().split(" ").join("-");
};
