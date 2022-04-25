import React from "react";

const Filter = ({ query, handleQueryChange }) => {
  return (
    <div>
      filter shown with <input value={query} onChange={handleQueryChange} />
    </div>
  );
};

export default Filter;
