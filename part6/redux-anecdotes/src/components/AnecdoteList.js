import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { vote } from "../reducers/anecdoteReducer";
import {
  votingNotify,
  removeNotification,
} from "../reducers/notificationReducer";

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
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .includes(state.filter.query.toLowerCase())
      )
  );
  const dispatch = useDispatch();

  const handleVote = (anecdote) => () => {
    dispatch(vote(anecdote.id));
    // set notification
    dispatch(votingNotify(anecdote.content));
    setTimeout(() => dispatch(removeNotification()), 5000);
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
