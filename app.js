const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const adminRouter = require("./routers/adminRoutes");
const categoryRouter = require("./routers/categoriRoutes");
const courseRouter = require("./routers/courseRoutes");
const courseContentRouter = require("./routers/courseContentRoutes");
const userRouter = require("./routers/userRoutes");
const couponRouter = require("./routers/couponRouter");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/courseContent", courseContentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/coupon", couponRouter);

module.exports = app;
