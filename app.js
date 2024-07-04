const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const adminRouter = require("./routers/adminRoutes");
const categoryRouter = require("./routers/categoriRoutes");
const courseRouter = require("./routers/courseRoutes");
const courseContentRouter = require("./routers/courseContentRoutes");
const userRouter = require("./routers/userRoutes");
const couponRouter = require("./routers/couponRouter");
const courseTopicsRouter = require("./routers/courseTopicsRouter");
const userOrderRouter = require("./routers/userOrderRouter");
const adminOrderRouter = require("./routers/adminOrderRouter");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/courseContent", courseContentRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/courseTopics", courseTopicsRouter);
app.use("/api/v1/userOrders", userOrderRouter);
app.use("/api/v1/adminOrders", adminOrderRouter);

module.exports = app;
