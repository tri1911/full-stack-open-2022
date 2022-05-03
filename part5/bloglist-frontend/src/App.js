import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LOGGED_IN_USER_KEY = "loggedBlogAppUser";

const App = () => {
  /**
   * States
   */

  // all blog
  const [blogs, setBlogs] = useState([]);
  // logged-in user
  const [user, setUser] = useState(null);
  // notification
  const [notification, setNotification] = useState(null);

  /**
   * Refs
   */

  const blogFormRef = useRef();

  /**
   * Effects
   */

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_IN_USER_KEY);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  /**
   * Essential Methods
   */

  const handleLogin = async (credentials) => {
    try {
      // login operation
      const user = await loginService.login(credentials);
      // notify successful login
      notify(`Login successfully! Hello ${user.name}`);
      // update the `user` state
      setUser(user);
      // set user's token into the `token` variable in blogService module
      blogService.setToken(user.token);
      // make the user persistence
      window.localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    } catch (exception) {
      notify("wrong username or password", "alert");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_IN_USER_KEY);
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      // hide the blog form
      blogFormRef.current.toggleVisibility();
      // send `create a new blog` request to server
      const savedBlog = await blogService.create(newBlog);
      // notify message
      notify(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
      // add the newly added blog into the `blogs` list on browser
      setBlogs(blogs.concat(savedBlog));
    } catch (exception) {
      notify("fails to add new blog", "alert");
    }
  };

  const updateBlog = async (id, newBlog) => {
    try {
      // send `update` request to server along with newBlog data
      const updatedBlog = await blogService.update(id, newBlog);
      // update blogs list
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );
    } catch (exception) {
      notify(exception.message, "alert");
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      notify("Successfully removed!");
      // update the blogs list
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (exception) {
      notify(exception.message, "alert");
    }
  };

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const sortedBlogsToShow = [...blogs].sort((a, b) => a.likes - b.likes);

  return (
    <div>
      <h2>{user === null ? "Log in to application" : "Blogs"}</h2>
      <Notification notification={notification} />

      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged in{" "}
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </p>
          <Togglable buttonLabel="create a new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}

      {sortedBlogsToShow.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={
            user && user.username === blog.creator.username ? removeBlog : null
          }
        />
      ))}
    </div>
  );
};

export default App;
