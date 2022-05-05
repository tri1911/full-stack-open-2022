import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
      return state;
    },
    setAnecdotes(_state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const addedAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(appendAnecdote(addedAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes;
    const originalAnecdote = anecdotes.find((a) => a.id === anecdote.id);
    const updatedAnecdote = {
      ...originalAnecdote,
      votes: originalAnecdote.votes + 1,
    };
    const result = await anecdoteService.updateAnecdote(updatedAnecdote);
    dispatch(voteAnecdote(result));
  };
};

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
