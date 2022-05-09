import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  if (!props.show || !result.data) {
    return null;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BirthYearForm names={authors.map((author) => author.name)} />
    </div>
  );
};

const BirthYearForm = ({ names }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    editAuthor({ variables: { name, born: Number(birthYear) } });
    // clear fields
    setName("");
    setBirthYear("");
  };

  return (
    <div>
      <h3>Set birth year</h3>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {names.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <div>
          born{" "}
          <input
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
