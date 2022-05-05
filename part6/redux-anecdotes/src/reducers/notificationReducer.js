import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null },
  reducers: {
    updateMessage(state, action) {
      state.message = action.payload;
      return state;
    },
    clearNotification(state, action) {
      state.message = null;
      return state;
    },
  },
});

export const setNotification = (message, duration) => {
  return (dispatch) => {
    dispatch(updateMessage(message));
    setTimeout(() => dispatch(clearNotification()), duration * 1000);
  };
};

export const { updateMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
