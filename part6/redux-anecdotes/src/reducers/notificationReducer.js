import { createSlice } from "@reduxjs/toolkit";

// variable used to store timeoutID in order to clear timeout when needed
let timeoutID = null;

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
    timeoutID && clearTimeout(timeoutID);
    // timeoutID && console.log("clearing timeoutId:", timeoutID);
    timeoutID = setTimeout(() => {
      // console.log("callback of", timeoutID, "called");
      dispatch(clearNotification());
    }, duration * 1000);
    // console.log("created new timeoutId:", timeoutID);
  };
};

export const { updateMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
