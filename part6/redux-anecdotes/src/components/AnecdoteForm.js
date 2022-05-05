import React from "react";
// import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  // const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    // dispatch(createAnecdote(anecdote));
    createAnecdote(anecdote);
    // set notification
    // dispatch(setNotification(`you added ${anecdote.content}`, 3));
    setNotification(`you added ${anecdote.content}`, 3);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default connect(null, { createAnecdote, setNotification })(AnecdoteForm);
