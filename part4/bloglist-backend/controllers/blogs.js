const Blog = require("../models/blog");
const blogsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

// get all blog posts
blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("creator");
  response.json(blogs);
});

// add new blog post
blogsRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    creator: user._id,
  });

  const savedBlog = await blog.save();
  await savedBlog.populate("creator");

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// Exercise 4.13 - delete a single blog post
blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogIdToRemove = request.params.id;
  const blogToDelete = await Blog.findById(blogIdToRemove);

  const user = request.user;
  const userId = user._id;

  if (userId.toString() !== blogToDelete.creator.toString()) {
    return response
      .status(401)
      .json({ error: "current user is not blog creator" });
  }

  await Blog.findByIdAndRemove(blogIdToRemove);
  user.blogs = user.blogs.filter(
    (blogId) => blogId.toString() !== blogIdToRemove
  );
  await user.save();

  response.status(204).end();
});

// Exercise 4.14 - update the information of an individual blog post
blogsRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("creator");

  response.json(updatedBlog);
});

module.exports = blogsRouter;
