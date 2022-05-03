// import the mongoose instance to close its connection after running all tests
const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = request(app);

jest.setTimeout(100000);

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

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

  // variable to store valid token
  let token;

  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();

    // login to get the token - assume we have passed the test with login API
    const loginResult = await api
      .post("/api/login")
      .send({ username: "root", password: "secret" });

    token = `bearer ${loginResult.body.token}`;
  });

  describe("addition of a new blog", () => {
    // Exercise 4.23
    test("fails with proper status code and message if token is missing", async () => {
      const newBlog = {
        title: "Artificial Intelligence threatens human being",
        author: "Elliot Ho",
        url: "http://ai-revolution.com",
        likes: 19,
      };

      // request a POST request without setting the `Authorization` header
      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(401)
        .expect("Content-Type", /application\/json/);

      expect(response.body.error).toContain("token is missing");
    });

    // Exercise 4.10
    test("succeeds with valid data", async () => {
      const newBlog = {
        title: "Computer Science Introduction",
        author: "Elliot Ho",
        url: "http://computerscience-introduction.com",
        likes: 99,
      };

      // set the Authorization header along with new blog post
      await api
        .post("/api/blogs")
        .set("Authorization", token)
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

      const response = await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog);
      expect(response.body.likes).toBeDefined();
      expect(response.body.likes).toBe(0);
    });

    // Exercise 4.12
    test("fails with status code 400 if the title property is missing", async () => {
      const newBlog = {
        author: "Elliot Ho",
        url: "http://computerscience-introduction.com",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test("fails with status code 400 if the url property is missing", async () => {
      const newBlog = {
        title: "Computer Science Introduction",
        author: "Elliot Ho",
      };

      await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  // Exercise 4.13 - delete a single blog post
  describe("deletion of a blog post by a valid creator", () => {
    test("succeeds with status code 204 if id is valid", async () => {
      const response = await api
        .post("/api/blogs")
        .set("Authorization", token)
        .send({
          title: "This is test for deletion",
          author: "Elliot Ho",
          url: "http://just-a-test.com",
          likes: 11,
        })
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogToDelete = response.body;

      // const blogsAtStart = await helper.blogsInDb();
      // const blogToDelete = blogsAtStart[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set("Authorization", token)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  // Exercise 4.14 - update the information of an individual blog post
  describe("update a blog post", () => {
    test("succeeds with status code 200 if data is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = { ...blogsAtStart[0], likes: 999 };

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      const updatedBlog = blogsAtEnd.find(
        (blog) => blog.id === blogToUpdate.id
      );
      expect(updatedBlog.likes).toBe(999);
    });
  });
});

// Exercise 4.15, 4.16 - create user
describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany();

    const passwordHash = await bcrypt.hash("secret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation fails with proper status code and message if user name already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "root", name: "Superuser", password: "123456" };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-type", /application\/json/);

    expect(response.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper status code and message if user name length is smaller than 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "hi", name: "Dummy", password: "111111" };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain(
      "username & password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper status code and message if password length is smaller than 3", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = { username: "elliot", name: "Elliot", password: "12" };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain(
      "username & password must be at least 3 characters long"
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
