import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { Button } from "react-bootstrap";

const Menu = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const padding = {
    paddingRight: 5,
    background: "lightgrey",
  };

  return (
    <div>
      <Link to="/users" style={padding}>
        users
      </Link>
      <Link to="/" style={padding}>
        blogs
      </Link>
      {user.name} logged in{" "}
      <Button variant="dark" onClick={() => dispatch(logout())}>
        Log Out
      </Button>
    </div>
  );
};

export default Menu;
