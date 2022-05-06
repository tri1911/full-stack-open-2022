import { useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { loadUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";

import Blogs from "./components/Blogs";
import BlogDetails from "./components/BlogDetails";
import Users from "./components/Users";
import User from "./components/User";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Menu from "./components/Menu";

import { Container } from "react-bootstrap";

const App = () => {
  const blogFormRef = useRef();
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const { notification, blogs, user, users } = useSelector(
    ({ notification, blogs, user, users }) => {
      return {
        notification,
        blogs: [...blogs].sort(byLikes),
        user,
        users,
      };
    }
  );

  if (user === null) {
    return (
      <Container>
        <Notification notification={notification} />
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <Menu />

      <h2>Blog App</h2>
      <Notification notification={notification} />

      <Routes>
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route
          path="/"
          element={
            <div>
              <Togglable buttonLabel="create new" ref={blogFormRef}>
                <NewBlogForm
                  toggleVisibility={() =>
                    blogFormRef.current.toggleVisibility()
                  }
                />
              </Togglable>
              <Blogs blogs={blogs} />
            </div>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
