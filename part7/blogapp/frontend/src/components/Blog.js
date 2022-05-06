import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const Blog = ({ blog }) => {
  return (
    <ListGroup.Item className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </ListGroup.Item>
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
    comments: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Blog;
