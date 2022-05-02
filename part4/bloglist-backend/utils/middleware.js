const logger = require("./logger");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

// Exercise 4.20 - extract the token and sets it to the request object
const tokenExtractor = (request, _response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

// Exercise 4.22 - find out the user and sets it to the request object
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "token is missing" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token is invalid" });
  }

  const user = await User.findById(decodedToken.id);
  request.user = user;

  next();
};

module.exports = { errorHandler, tokenExtractor, userExtractor };
