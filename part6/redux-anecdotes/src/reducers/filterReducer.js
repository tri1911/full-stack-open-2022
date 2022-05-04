import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { query: "" },
  reducers: {
    updateQuery(state, action) {
      state.query = action.payload;
      return state;
    },
  },
});
export const { updateQuery } = filterSlice.actions;
export default filterSlice.reducer;
