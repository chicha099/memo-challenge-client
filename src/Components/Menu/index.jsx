import React from "react";
import { useState } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const Menu = () => {
  const dispatch = useDispatch();
  return (
    <div className="menu">
      <div>
        <h1>Memo Test Challenge</h1>
        {sessionStorage.getItem("sessionId") ? (
          <Link
            to={`/game/${
              JSON.parse(sessionStorage.getItem("sessionId")).memoId
            }`}
          >
            <button>Resume Memo Test</button>
          </Link>
        ) : null}
        <Link to="/select">
          <button>Select Memo Test</button>
        </Link>
        <Link to="/create">
          <button>Create Memo Test</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
