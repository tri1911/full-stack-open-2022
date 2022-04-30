// import modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
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

// run server
const PORT = config.PORT || 3003;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
