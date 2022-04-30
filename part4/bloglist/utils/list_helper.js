const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const reducer = (currentMax, blog) =>
    blog.likes > currentMax.likes ? blog : currentMax;
  const { title, author, likes } = blogs.reduce(reducer);
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  return _(blogs)
    .countBy("author")
    .map((value, key) => ({
      author: key,
      blogs: value,
    }))
    .maxBy("blogs");
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  return _(blogs)
    .groupBy("author")
    .map((obj, key) => ({
      author: key,
      likes: _.sumBy(obj, "likes"),
    }))
    .maxBy("likes");
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
