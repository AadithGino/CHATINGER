const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userHomeRoutes = require("./routes/UserRoutes/home-feature-routes");
const usersLogin_SignupRouter = require("./routes/UserRoutes/signup-login");
const userChatRoutes = require("./routes/UserRoutes/chat-Routes");
const userStatusRoutes = require("./routes/UserRoutes/status-Routes");
dotenv.config();

const app = express();

const cors = require("cors");
const { resolve } = require("path");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGOOSE_URL);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersLogin_SignupRouter);
app.use("/", userHomeRoutes);
app.use("/chat", userChatRoutes);
app.use("/status",userStatusRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

app.listen(5000, () => {
  console.log(5000);
});



module.exports = app;
