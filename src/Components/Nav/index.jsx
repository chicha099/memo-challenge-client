import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">Menu</Link>
      <Link to="/create">Create</Link>
      <Link to="/select">Select</Link>
    </div>
  );
};

export default Nav;
