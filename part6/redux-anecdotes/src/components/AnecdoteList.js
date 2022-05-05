import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

// presentational component
const AnecdoteItem = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

// container component
const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.query.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => () => {
    dispatch(vote(anecdote));
    // set notification
    dispatch(setNotification(`you voted ${anecdote.content}`, 3));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <AnecdoteItem
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
