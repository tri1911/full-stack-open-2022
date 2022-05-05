import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (content) => {
  const response = await axios.post(baseUrl, { content, votes: 0 });
  return response.data;
};

const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return response.data;
};

const services = { getAll, createAnecdote, updateAnecdote };

export default services;
