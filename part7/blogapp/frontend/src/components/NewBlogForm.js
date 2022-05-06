import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { Form, Button } from "react-bootstrap";

const NewBlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url, likes: 0 }));
    // close form & clear fields
    toggleVisibility();
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div className="mb-2">
      <h3>Create new</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Enter title of the blog"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Enter author of the blog"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Enter URL of the blog"
          />
        </Form.Group>
        <Button id="create-button" variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
