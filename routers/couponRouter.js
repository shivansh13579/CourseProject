const Router = require("express");
const couponController = require("../controllers/couponController");
const couponValidationSchema = require("../apiValidationSchemas/couponValidationSchema");
const joiSchemaValidation = require("../middleware/joiSchemaValidation");
const adminAuthentication = require("../middleware/adminAuthentication");
const couponRouter = Router();
