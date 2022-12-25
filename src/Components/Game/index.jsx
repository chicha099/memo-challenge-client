import React, { useEffect } from "react";
import Cards from "../Cards";
import "./game.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  createSession,
  emptyCompletedPairs,
  getMemoById,
  getSessionById,
} from "../../Redux/actions";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteSession } from "../../Redux/actions";
const Game = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedMemo = useSelector((state) => state.selectedMemo);
  const completedPairs = useSelector((state) => state.completedPairs);
  const currentSession = useSelector((state) => state.currentSession);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getMemoById(id));
    console.log(selectedMemo, completedPairs)
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
    if (selectedMemo.images) {
      if (
        completedPairs.length &&
        completedPairs.length === selectedMemo.images.length
      ) {
        setTimeout(() => {
          alert(
            "You win!" +
              " " +
              "Your score is: " +
              Math.floor(
                (currentSession.numberOfPairs / (currentSession.retries + 1)) *
                  100
              )
          );
          dispatch(
            deleteSession(JSON.parse(sessionStorage.getItem("sessionId")).id)
          );
          dispatch(emptyCompletedPairs());
          sessionStorage.removeItem("sessionId");
          history.push("/");
        }, 1000);
      }
    }
  }, [completedPairs]);
  const handleModal = (option) => {
    if (option) {
      dispatch(createSession(selectedMemo));
      dispatch(emptyCompletedPairs())
      setShowModal(false);
    } else {
      setShowModal(false);
      history.push("/");
    }
  };

  return (
    <div className="game">
      {showModal ? (
        <div className="modalSession">
          <div className="whiteModal">
            <p>
              You already have an uncompleted memo test session in progress, if
              you continue you will lose your progress
            </p>
            <div className="buttons">
              <button onClick={() => handleModal(false)}>Cancel</button>
              <button onClick={() => handleModal(true)}>Accept</button>
            </div>
          </div>
        </div>
      ) : null}
      <Cards />
    </div>
  );
};

export default Game;
