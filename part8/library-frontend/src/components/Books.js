import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = ({ show, genres }) => {
  const [genre, setGenre] = useState("all genres");
  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: genre === "all genres" ? null : genre,
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (!show || !data) {
    return null;
  }

  const filteredBooks = data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre <strong>{genre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Genre filter */}
      {[...genres, "all genres"].map((genre) => (
        <button
          key={genre}
          onClick={() => {
            setGenre(genre);
            refetch({ genre: genre === "all genres" ? null : genre });
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
};

export default Books;
