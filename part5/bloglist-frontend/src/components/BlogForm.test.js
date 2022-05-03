import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> calls the event handler with the right details when a new blog is created", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  render(<BlogForm createBlog={createBlog} />);
  // simulate user input & clicking the `create` button
  const titleInput = screen.getByTestId("title-input");
  const authorInput = screen.getByTestId("author-input");
  const urlInput = screen.getByTestId("url-input");
  const createButton = screen.getByTestId("create-blog-btn");
  await user.type(titleInput, "sample title...");
  await user.type(authorInput, "sample author...");
  await user.type(urlInput, "sample url...");
  await user.click(createButton);
  // test
  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog.mock.calls[0][0].title).toBe("sample title...");
  expect(createBlog.mock.calls[0][0].author).toBe("sample author...");
  expect(createBlog.mock.calls[0][0].url).toBe("sample url...");
});
