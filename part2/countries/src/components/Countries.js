import { useState } from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  const [selected, setSelected] = useState("");

  return (
    <div>
      {countries.map((country) => {
        const name = country.name.common;
        return name !== selected ? (
          <div key={name}>
            {name} <button onClick={() => setSelected(name)}>show</button>
          </div>
        ) : (
          <Country key={name} country={country} />
        );
      })}
    </div>
  );
};

export default Countries;
