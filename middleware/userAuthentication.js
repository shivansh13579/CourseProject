const lodash = require("lodash");
const serverResponse = require("../constants/serverResponse");
const { commanMessage } = require("../constants/message");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      response.message = commanMessage.VALIDATION_FAILED;
      response.errors.error = commanMessage.TOKEN_MISSING;
      res.status(response.status).send(response);
    }

    const token = authorization?.replace("Bearer ", "");

    let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodeToken.id);

    if (!user) {
      response.message = commanMessage.VALIDATION_FAILED;
      response.errors.error = commanMessage.INVALID_ID;
      res.status(response.status).send(response);
    }
    req.user = user;
    next();
  } catch (error) {
    response.message = commanMessage.VALIDATION_FAILED;
    response.errors.error = error.message;
    res.status(response.status).send(response);
  }
};
