import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user";
import loginService from "../services/login";
import { createNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const loadUser = () => {
  return (dispatch) => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  };
};

export const saveUser = (user) => {
  return (dispatch) => {
    userService.setUser(user);
    dispatch(setUser(user));
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      userService.setUser(user);
      dispatch(setUser(user));
      dispatch(createNotification(`${user.name} logged in!`));
    } catch (error) {
      dispatch(createNotification("wrong username/password", "alert"));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    userService.clearUser();
    dispatch(setUser(null));
    dispatch(createNotification("good bye!"));
  };
};

export default userSlice.reducer;
