import React, { useEffect } from "react";
import Cards from "../Cards";
import "./game.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createSession,
  emptyCompletedPairs,
  getMemoById,
  getSessionById,
} from "../../Redux/actions";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Nav from "../Nav";
import { deleteSession } from "../../Redux/actions";
import { areEqual } from "../../Helpers";
import Loader from "../Loader";
const Game = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedMemo = useSelector((state) => state.selectedMemo);
  const completedPairs = useSelector((state) => state.completedPairs);
  const currentSession = useSelector((state) => state.currentSession);
  const [completedMemo, setCompletedMemo] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const scoreMessages = {
    100: "Perfect!",
    90: "Great!",
    80: "Good!",
    70: "Not bad!",
    60: "Not so good!",
    50: "You can do better!",
    40: "At least you tried!",
    30: "Are you even trying?",
    20: "You are not trying at all!",
    10: "Try with your eyes open!",
  };
  useEffect(() => {
    dispatch(getMemoById(id));
    
  }, []);

  useEffect(() => {
    if (selectedMemo.images) {
      if (sessionStorage.getItem("sessionId")) {
        dispatch(
          getSessionById(JSON.parse(sessionStorage.getItem("sessionId")).id)
        );

        if (JSON.parse(sessionStorage.getItem("sessionId")).memoId !== id) {
          setShowModal(true);
        }
      } else {
        dispatch(createSession(selectedMemo));
      }
    }
  }, [selectedMemo]);

  useEffect(() => {
    setScore(
      Math.floor((currentSession.numberOfPairs / currentSession.retries) * 100)
    );
    if (selectedMemo.images) {
     
      if (
        completedPairs.length &&
        completedPairs.length === selectedMemo.images.length &&
        areEqual(selectedMemo.images, completedPairs)
      ) {
        setTimeout(() => {
          setCompletedMemo(true);

          dispatch(
            deleteSession(JSON.parse(sessionStorage.getItem("sessionId")).id)
          );
          dispatch(emptyCompletedPairs());
          sessionStorage.removeItem("sessionId");
        }, 1000);
      }
    }
  }, [completedPairs]);
  const handleModal = (option) => {
    if (option) {
      dispatch(createSession(selectedMemo));
      dispatch(emptyCompletedPairs());
      setShowModal(false);
    } else {
      setShowModal(false);
      history.push("/");
    }
  };
  return (
    <div>
      {selectedMemo.images && (id === selectedMemo.id) ? (
        <div className="game">
          <Nav></Nav>
          {completedMemo ? (
            <div className="modalSession">
              <div className="whiteModal">
                <h2>{scoreMessages[Math.ceil(score / 10) * 10]}</h2>
                <p>Score: {score}</p>
                <Link to="/">
                  <button>Go to Menu</button>
                </Link>
              </div>
            </div>
          ) : null}
          {showModal ? (
            <div className="modalSession">
              <div className="whiteModal">
                <h2>
                  You already have a session in progress for, do you want to
                  start a new one and lose your progress?
                </h2>
                <div className="buttons">
                  <button onClick={() => handleModal(false)}>Cancel</button>
                  <button onClick={() => handleModal(true)}>Accept</button>
                </div>
              </div>
            </div>
          ) : null}
          <Cards />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Game;
