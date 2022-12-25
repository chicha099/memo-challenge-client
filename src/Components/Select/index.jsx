import React, { useEffect } from "react";
import "./select.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllMemoTests, deleteMemo, deleteSession, emptySelectedMemo,emptyCompletedPairs } from "../../Redux/actions";
import { Link } from "react-router-dom";

const Select = () => {
  const dispatch = useDispatch();
  const allMemos = useSelector((state) => state.allMemos);
  useEffect(() => {
    dispatch(emptySelectedMemo());
    dispatch(getAllMemoTests());

  }, []);
  const handleDeleteMemo = (id) => {
    dispatch(deleteMemo(id));
    if(sessionStorage.getItem("sessionId")){
      dispatch(deleteSession(JSON.parse(sessionStorage.getItem("sessionId")).id));
      sessionStorage.removeItem("sessionId");
    }
    dispatch(getAllMemoTests());
  };
  return (
    <div className="select">
      <div className="memos">
        {allMemos.length > 0 &&
          allMemos.map((memo, index) => {
            return (
              <div className="memo">
                <p>{memo.name}</p>
                {
                  memo.images.map((image, index) => {
                    return <img src={image} alt="" />;
                  })
                }
                <Link to={`/edit/${memo.id}`} className={sessionStorage.getItem("sessionId") && JSON.parse(sessionStorage.getItem("sessionId")).memoId == memo.id ? "no-edit" : ""}>EDIT</Link>
                <button onClick={() => handleDeleteMemo(memo.id)}>DELETE</button>
                <Link to={`/game/${memo.id}`}>PLAY</Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Select;
