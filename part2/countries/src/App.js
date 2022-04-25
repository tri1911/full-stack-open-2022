import { useEffect, useState } from "react";
import axios from "axios";

import Country from "./components/Country";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const result = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      find countries{" "}
      <input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div>
        {result.length > 10 ? (
          <div>Too many matches, specify another filter</div>
        ) : result.length === 1 ? (
          <Country country={result[0]} />
        ) : (
          <Countries countries={result} />
        )}
      </div>
    </div>
  );
};

export default App;
