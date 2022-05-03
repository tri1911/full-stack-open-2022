import { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    const newBlog = {
      creator: blog.creator?.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    updateBlog(blog.id, newBlog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <>
          <br />
          {blog.url}
          <br />
          likes {blog.likes}{" "}
          <button data-testid="like-button" onClick={handleLike}>
            like
          </button>
          <br />
          {blog.creator?.name}
          <br />
          {removeBlog && <button onClick={handleRemove}>remove</button>}
        </>
      )}
    </div>
  );
};

export default Blog;
