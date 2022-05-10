import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: userData } = useQuery(ME, { skip: !token });
  const { data: booksData } = useQuery(ALL_BOOKS);
  const { data: authorsData } = useQuery(ALL_AUTHORS);
  const client = useApolloClient();

  useEffect(() => {
    if (token) {
      setPage("books");
    }
  }, [token]);

  const genres = new Set(
    booksData?.allBooks
      .map((book) => book.genres)
      .reduce((result, current) => [...result, ...current], [])
  );

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors show={page === "authors"} authors={authorsData?.allAuthors} />

      <Books show={page === "books"} genres={genres} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
      />

      <Recommend
        show={page === "recommend"}
        favoriteGenre={userData?.me.favoriteGenre}
      />

      <NewBook show={page === "add"} setError={setErrorMessage} />
    </div>
  );
};

export default App;
