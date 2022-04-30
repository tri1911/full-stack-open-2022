// import modules
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const blogsRouter = require("./controllers/blogs");

const app = express();

// mongo db connection
const mongoUrl = config.MONGODB_URI;
logger.info("connecting to", mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => logger.info("connect to MongoDB"))
  .catch((error) =>
    logger.error("error connecting to MongoDB:", error.message)
  );

// add middleware
app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(middleware.errorHandler);

// export the express application
module.exports = app;
