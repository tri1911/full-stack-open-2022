import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null },
  reducers: {
    creationNotify(state, action) {
      state.message = `You created ${action.payload}`;
      return state;
    },
    votingNotify(state, action) {
      state.message = `You voted '${action.payload}'`;
      return state;
    },
    removeNotification(state) {
      if (state.message !== null) {
        state.message = null;
      }
      return state;
    },
  },
});

export const { creationNotify, votingNotify, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
