import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { createNotification } from "./notificationReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      );
    },
  },
});

export const { setBlogs, appendBlog, deleteBlog, updateBlog } =
  blogReducer.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.create(blog);
      dispatch(appendBlog(createdBlog));
      dispatch(
        createNotification(
          `a new blog '${createdBlog.title}' by ${createdBlog.author} added`
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          `creating a blog failed: ${error.response.data.error}`,
          "alert"
        )
      );
    }
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id);
      dispatch(deleteBlog(id));
    } catch (error) {
      dispatch(
        createNotification(
          `removing a blog failed: ${error.response.data.error}`,
          "alert"
        )
      );
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const liked = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id,
    };

    try {
      const updatedBlog = await blogService.update(liked.id, liked);
      dispatch(updateBlog(updatedBlog));
      dispatch(
        createNotification(
          `you liked '${updatedBlog.title}' by ${updatedBlog.author}`
        )
      );
    } catch (error) {
      dispatch(
        createNotification(
          `liking a blog failed: ${error.response.data.error}`,
          "alert"
        )
      );
    }
  };
};

export const submitComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.submitComment(id, comment);
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      console.error(error);
    }
  };
};

export default blogReducer.reducer;
