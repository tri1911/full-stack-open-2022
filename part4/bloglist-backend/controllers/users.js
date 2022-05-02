const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// Exercise 4.15, 4.17

// see details of all users
usersRouter.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  response.json(users);
});

// create new user route handler
usersRouter.post("/", async (request, response) => {
  // extract data from the request
  const { username, name, password } = request.body;
  // validate the username
  if (password.length < 3 || username.length < 3) {
    return response.status(400).json({
      error: "username & password must be at least 3 characters long",
    });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({ error: "username must be unique" });
  }
  // hash the input password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  // save to mongo db
  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
