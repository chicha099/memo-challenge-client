import React, { useEffect } from "react";
import { useState } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllMemoTests } from "../../Redux/actions";

const Menu = () => {
  const dispatch = useDispatch();
  const allMemos = useSelector((state) => state.allMemos);
  useEffect(() => {
    dispatch(getAllMemoTests());
  }, []);
  return (
    <div className="menu">
      <div>
        <h1>Memo Test Challenge</h1>
        <div className="buttons">
          {sessionStorage.getItem("sessionId") ? (
            <Link
              to={`/game/${
                JSON.parse(sessionStorage.getItem("sessionId")).memoId
              }`}
            >
              Resume Memo Test
            </Link>
          ) : null}
          <Link to="/select" className={allMemos.length > 0 ? "" : "disabled"}>Select Memo Test</Link>
          <Link to="/create">Create Memo Test</Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
