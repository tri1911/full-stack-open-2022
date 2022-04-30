// import the mongoose instance to close its connection after running all tests
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

const api = request(app);

const Blog = require("../models/blogs");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

jest.setTimeout(100000);

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((blog) => blog.title);

    expect(titles).toContain("Go To Statement Considered Harmful");
  });

  test("the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("addition of a new note", () => {
  // Exercise 4.10
  test("succeeds with valid data", async () => {
    const newBlog = {
      title: "Computer Science Introduction",
      author: "Elliot Ho",
      url: "http://computerscience-introduction.com",
      likes: 99,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain(newBlog.title);
  });

  // Exercise 4.11
  test("the likes property get default value of 0 if missing", async () => {
    const newBlog = {
      title: "Computer Science Introduction",
      author: "Elliot Ho",
      url: "http://computerscience-introduction.com",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });

  // Exercise 4.12
  test("fails with status code 400 if the title property is missing", async () => {
    const newBlog = {
      author: "Elliot Ho",
      url: "http://computerscience-introduction.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("fails with status code 400 if the url property is missing", async () => {
    const newBlog = {
      title: "Computer Science Introduction",
      author: "Elliot Ho",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

// Exercise 4.13 - delete a single blog post
describe("deletion of a blog post", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

// Exercise 4.14 - update the information of an individual blog post
describe("update a blog post", () => {
  test("succeeds with status code 200 if data is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 999 })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
    expect(updatedBlog.likes).toBe(999);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
