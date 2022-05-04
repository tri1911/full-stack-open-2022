import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    // call the actual createBlog function
    createBlog({ title: newTitle, author: newAuthor, url: newURL });
    // clear form
    setNewTitle("");
    setNewAuthor("");
    setNewURL("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            data-testid="title-input"
            id="title-input"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            data-testid="author-input"
            id="author-input"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:{" "}
          <input
            data-testid="url-input"
            id="url-input"
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)}
          />
        </div>
        <button
          data-testid="create-blog-btn"
          id="create-blog-btn"
          type="submit"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
