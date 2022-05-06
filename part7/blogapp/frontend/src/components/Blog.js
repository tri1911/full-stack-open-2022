import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const BlogDetails = ({ blog, visible, own }) => {
  if (!visible) return null;

  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";

  const dispatch = useDispatch();
  const handleBlogRemoval = () => {
    if (window.confirm(`remove '${blog.title}' by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id));
    }
  };

  return (
    <div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      {addedBy}
      {own && <button onClick={handleBlogRemoval}>remove</button>}
    </div>
  );
};

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    padding: 3,
    margin: 5,
    borderStyle: "solid",
    borderWidth: 1,
  };

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <BlogDetails
        blog={blog}
        visible={visible}
        own={blog.user && user.username === blog.user.username}
      />
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

export default Blog;
