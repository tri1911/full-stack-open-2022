const Blog = require("../models/blogs");
const blogsRouter = require("express").Router();

// get all blog posts
blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// add new blog post
blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

// Exercise 4.13 - delete a single blog post
blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

// Exercise 4.14 - update the information of an individual blog post
blogsRouter.put("/:id", async (request, response) => {
  const { likes } = request.body;

  const blog = { likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
