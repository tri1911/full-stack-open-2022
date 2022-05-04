import React from "react";
import { useDispatch } from "react-redux";
import { updateQuery } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(updateQuery(event.target.value));
  };

  const style = { marginBottom: 10 };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
