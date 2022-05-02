import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LOGGED_IN_USER_KEY = "loggedBlogAppUser";

const App = () => {
  /**
   * States
   */

  // all blog
  const [blogs, setBlogs] = useState([]);
  // new blog
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");
  // logged-in user
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // notification
  const [notification, setNotification] = useState(null);

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
   * Event Handlers
   */

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      // login operation
      const user = await loginService.login({ username, password });
      // notify successful login
      notify(`Login successfully! Hello ${user.name}`);
      // update the `user` state
      setUser(user);
      // set user's token into the `token` variable in blogService module
      blogService.setToken(user.token);
      // make the user persistence
      window.localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
      // reset fields
      setUsername("");
      setPassword("");
    } catch (exception) {
      notify("wrong username or password", "alert");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_IN_USER_KEY);
    setUser(null);
  };

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const savedBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newURL,
      });
      // notify message
      notify(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
      // update the blogs state on front-end (browser)
      setBlogs(blogs.concat(savedBlog));
    } catch (exception) {
      notify("fails to add new blog", "alert");
    }

    setNewTitle("");
    setNewAuthor("");
    setNewURL("");
  };

  /**
   * views to render
   */

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:{" "}
        <input
          type="text"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          type="text"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          type="text"
          value={newURL}
          onChange={({ target }) => setNewURL(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && <Notification notification={notification} />}
        {loginForm()}
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification notification={notification} />}
      <p>
        {user.name} logged in{" "}
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
