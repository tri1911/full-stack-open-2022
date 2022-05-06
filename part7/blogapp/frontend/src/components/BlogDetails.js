import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, submitComment } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const [comment, setComment] = useState("");

  if (!blog) {
    return null;
  }

  const addedBy = blog.user && blog.user.name ? blog.user.name : "anonymous";

  const addComment = async () => {
    dispatch(submitComment(blog.id, comment));
    setComment("");
  };

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      {addedBy}

      <h3>comments</h3>
      <div>
        <input
          value={comment}
          type="text"
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>add comment</button>
      </div>
      {blog.comments.length > 0 && (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogDetails;
