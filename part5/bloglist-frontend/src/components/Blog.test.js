import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  test("renders the title and author only by default", () => {
    const blog = {
      title: "Artificial Intelligence",
      author: "Elliot",
      url: "example.com",
      likes: 1911,
    };

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector(".blog");

    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`);

    expect(div).not.toHaveTextContent(`${blog.url}`);
    expect(div).not.toHaveTextContent(`likes ${blog.likes}`);
    // OR
    // const detailsDiv = container.querySelector("#blog-details-div");
    // expect(detailsDiv).toBeNull();
  });

  test("blog's url & number of likes are show when the button controlling the shown details has been clicked", async () => {
    const blog = {
      title: "Artificial Intelligence",
      author: "Elliot",
      url: "example.com",
      likes: 1911,
    };

    const { container } = render(<Blog blog={blog} />);
    // simulate clicking
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent(blog.url);
    expect(div).toHaveTextContent(`likes ${blog.likes}`);
  });

  test("if the like button is clicked twice, the event handler is called twice", async () => {
    const blog = {
      title: "Artificial Intelligence",
      author: "Elliot",
      url: "example.com",
      likes: 1911,
    };
    const mockHandler = jest.fn();
    render(<Blog blog={blog} updateBlog={mockHandler} />);
    const user = userEvent.setup();
    await user.click(screen.getByText("view"));
    // simulate double click `Like` button
    const likeBtn = screen.getByTestId("like-button");
    await user.dblClick(likeBtn);
    // actual test
    expect(mockHandler).toHaveBeenCalledTimes(2);
    // OR expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
