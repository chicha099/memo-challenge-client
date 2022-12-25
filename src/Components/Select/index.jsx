import React, { useEffect } from "react";
import "./select.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getAllMemoTests,
  deleteMemo,
  deleteSession,
  emptySelectedMemo,
  emptyCompletedPairs,
} from "../../Redux/actions";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Nav from "../Nav";
import { useHistory } from "react-router-dom";

const Select = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allMemos = useSelector((state) => state.allMemos);
  useEffect(() => {
    dispatch(emptySelectedMemo());
    dispatch(getAllMemoTests());
  }, []);

  const handleDeleteMemo = (id) => {
    if (allMemos.length === 1) {
      alert("At least one memo must be available");
    } else {
      dispatch(deleteMemo(id));
      if (sessionStorage.getItem("sessionId")) {
        dispatch(
          deleteSession(JSON.parse(sessionStorage.getItem("sessionId")).id)
        );
        sessionStorage.removeItem("sessionId");
      }
      dispatch(getAllMemoTests());
    }
  };
  return (
    <div>
      {allMemos.length ? (
        <div className="select">
          <Nav />
          <div className="memos">
            {allMemos.length > 0 &&
              allMemos.map((memo, index) => {
                return (
                  <div className="memo">
                    <h2>
                      {memo.name.charAt(0).toUpperCase() + memo.name.slice(1)}
                    </h2>
                    <div className="images">
                      {memo.images.slice(0, 4).map((image, index) => {
                        if (index === 3 && memo.images.length > 4) {
                          return (
                            <div className="last-image">
                              <img src={image} alt="" />
                              <p>+{memo.images.length - 4}</p>
                            </div>
                          );
                        } else {
                          return <img src={image} alt="" />;
                        }
                      })}
                    </div>
                    <div className="buttons">
                      <Link
                        to={`/edit/${memo.id}`}
                        className={
                          sessionStorage.getItem("sessionId") &&
                          JSON.parse(sessionStorage.getItem("sessionId"))
                            .memoId == memo.id
                            ? "no-edit"
                            : ""
                        }
                      >
                        EDIT
                        <p
                          className={
                            sessionStorage.getItem("sessionId") &&
                            JSON.parse(sessionStorage.getItem("sessionId"))
                              .memoId == memo.id
                              ? "no-edit"
                              : "hidden"
                          }
                        >
                          Edit not allowed session in progress
                        </p>
                      </Link>
                      <a onClick={() => handleDeleteMemo(memo.id)}>DELETE</a>
                      <Link to={`/game/${memo.id}`}>PLAY</Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Select;
