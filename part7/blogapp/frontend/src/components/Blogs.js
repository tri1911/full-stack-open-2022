import React from "react";
import Blog from "./Blog";
import { ListGroup } from "react-bootstrap";

const Blogs = ({ blogs }) => {
  return (
    <ListGroup id="blogs">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ListGroup>
  );
};

export default Blogs;
